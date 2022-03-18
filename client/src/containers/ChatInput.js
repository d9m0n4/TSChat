import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { connect } from 'react-redux';

import ChatInput from '../components/ChatInput';
import socket from '../api/socket';

import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';

import { CloseCircleTwoTone } from '@ant-design/icons';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ChatInputContainer = ({ dialogId, sendMessage, currentConvId, user }) => {
  const [messageValue, setMessageValue] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const canvas = useRef();
  const audioResult = useRef();
  const emojiPicker = useRef();

  const { visible, toggleVisiblePicker } = useOutsideClick(emojiPicker);

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const setEmoji = (data) => {
    setMessageValue(messageValue + ' ' + data.native);
  };

  const onSendMessage = async () => {
    setUploading(true);
    let result = [];
    if (fileList.length || messageValue) {
      if (fileList.length) {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i].originFileObj || fileList[i];
          const f = await Files.upload(file);
          result.push(f.data.file);
        }
      }
      setMessageValue('');
      setFileList([]);
      setUploading(false);

      if (messageValue || fileList.length > 0) {
        sendMessage({
          dialogId: dialogId || currentConvId,
          text: messageValue,
          attachments: result.map((item) => item._id),
        });
      }
    }
  };

  let timeout = null;
  const [isTyping, setIsTyping] = useState(false);

  function timeoutFunction() {
    socket.emit('TYPING', false);
    setIsTyping(false);
  }

  const handleTyping = (e) => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('TYPING', { dialog: dialogId || currentConvId, user });
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 3000);
    }

    if (e.keyCode === 13) {
      e.preventDefault();
      timeoutFunction();
      onSendMessage();
    }
  };

  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  const uploaderProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    showUploadList: {
      removeIcon: <CloseCircleTwoTone twoToneColor="#FA2424" />,
      showPreviewIconL: false,
    },

    onChange: ({ fileList }) => {
      let files = [];
      fileList.forEach((file) => {
        if (!(file.size / 1024 / 1024 > 2)) {
          files.push(file);
          setFileList(files);
        } else {
          console.log('file size is > 5mb');
        }
      });
    },

    onPreview: async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();

      image.width = '1000';
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    },

    fileList,
  };

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mediaDevices.getUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const Recording = () => {
    if (navigator.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            noiseSuppression: true,
          },
        })
        .then((stream) => {
          onRecording(stream);
        })
        .catch((e) => {
          console.dir(e);
        });
    } else {
      console.log('userMedia not');
    }
  };

  const onRecording = (stream) => {
    let recorder = new MediaRecorder(stream);
    setRecorder(recorder);
    recorder.start();

    let reqId;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({
      latencyHint: 'interactive',
    });
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.9;

    const audioSrc = audioCtx.createMediaStreamSource(stream);

    audioSrc.connect(analyser);
    // sourceNode.connect(audioCtx.destination);
    analyser.fftSize = 1024;
    // analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;

    const data = new Uint8Array(bufferLength);

    recorder.onstart = () => {
      setIsRecording(true);

      let cw = canvas.current.width;
      let ch = canvas.current.height;

      const ctx = canvas.current.getContext('2d');

      ctx.clearRect(0, 0, cw, ch);

      let barWidth = (bufferLength / cw) * 2;
      let barHeight;
      let x;

      const draw = () => {
        analyser.getByteFrequencyData(data);
        ctx.fillStyle = '#E5E5E5';
        ctx.fillRect(0, 0, cw, ch);

        x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = data[i] + 5;

          ctx.fillStyle = '#3A456B';

          ctx.fillRect(cw / 2 - x * 1.5, ch / 2, barWidth, barHeight / 2.5);
          ctx.fillRect(cw / 2 - x * 1.5, ch / 2, barWidth, -barHeight / 2.5);
          ctx.fillRect(cw / 2 + (x - barWidth) * 1.5, ch / 2, barWidth, -barHeight / 2.5);
          ctx.fillRect(cw / 2 + (x - barWidth) * 1.5, ch / 2, barWidth, barHeight / 2.5);

          x += barWidth;
        }

        reqId = requestAnimationFrame(draw);
      };
      draw();
    };

    recorder.onstop = (e) => {
      window.cancelAnimationFrame(reqId);
      stream.getAudioTracks()[0].stop();
      return setIsRecording(false);
    };

    recorder.ondataavailable = async (e) => {
      const file = new File([e.data], 'audio', { type: 'audio/wav' });

      setFileList([file]);
      setIsRecording(false);

      const ctxResult = audioResult.current.getContext('2d');

      const src = URL.createObjectURL(file);
      const audio = new Audio();
      audio.src = src;
      let x;
      audioResult.current.height = 32;
      audioResult.current.width = 530;

      const drawAudio = async (f) => {
        const arrB = await f.arrayBuffer();
        const a = await audioCtx.decodeAudioData(arrB);
        const b = normalizeData(filterData(a));

        const cw = audioResult.current.width;
        const ch = audioResult.current.height;

        ctxResult.fillStyle = '#E5E5E5';
        ctxResult.fillRect(0, 0, cw, ch);

        let bh = 0;
        let bw = 2;
        x = 0;

        for (let i = 0; i < b.length; i++) {
          bh = b[i] * 100 + 1;
          ctxResult.fillStyle = '#3A456B';

          ctxResult.fillRect(-cw + x * 1.5, ch / 2, bw, bh * 2);
          ctxResult.fillRect(-cw + x * 1.5, ch / 2, bw, -bh * 2);
          x += bw;
        }
      };

      const filterData = (audioBuffer) => {
        const rawData = audioBuffer.getChannelData(0);
        const samples = 1024;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }
        return filteredData;
      };

      const normalizeData = (filteredData) => {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map((n) => n * multiplier);
      };

      drawAudio(file);
    };
  };

  const handleStop = () => {
    if (isRecording) {
      recorder.stop();
    }
  };

  return (
    <ChatInput
      emojiPicker={emojiPicker}
      audioResult={audioResult}
      record={Recording}
      handleStop={handleStop}
      isRecording={isRecording}
      canvas={canvas}
      value={messageValue}
      onSendMessage={onSendMessage}
      onChange={onChangeValue}
      setEmoji={setEmoji}
      toggleVisiblePicker={toggleVisiblePicker}
      visiblePicker={visible}
      uploaderProps={uploaderProps}
      uploading={uploading}
      handleTyping={handleTyping}
    />
  );
};

export default connect(
  ({ auth, dialogs, conversations }) => ({
    user: auth.user,
    dialogId: dialogs.currentDialogId,
    currentConvId: conversations.currentConvId,
  }),
  messagesActions,
)(ChatInputContainer);
