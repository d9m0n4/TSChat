import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { useRef } from 'react';

const ChatInputContainer = ({ dialogId, sendMessage }) => {
  const [messageValue, setMessageValue] = useState('');
  const [visiblePicker, setVisiblePicker] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileType, setFileType] = useState('');

  const canvas = useRef();

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const setEmoji = (data) => {
    console.log(data);
    setMessageValue(messageValue + ' ' + data.native);
  };

  const toggleVisiblePicker = () => {
    setVisiblePicker(!visiblePicker);
  };

  const onSendMessage = async () => {
    setUploading(true);
    let result = [];
    console.log(fileList);
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i].originFileObj || fileList[i];
        const f = await Files.upload(file);
        result.push(f.data.file);
      }
      setMessageValue('');
      setFileList([]);
      setUploading(false);
      sendMessage({
        dialogId: dialogId,
        text: messageValue || null,
        attachments: result.map((item) => item._id),
      });
    }
  };

  const uploaderProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const fileSize = file.size / 1024 / 1024 < 2;
      if (!fileSize) {
        console.log('размер файла не должен превышать 10мб');
      }

      return null;
    },
    showUploadList: {
      removeIcon: <CloseCircleTwoTone twoToneColor="#FA2424" />,
      showPreviewIconL: false,
    },

    onChange: ({ fileList }) => {
      setFileList(fileList);
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
        .getUserMedia({ audio: true, video: false })
        .then((d) => {
          onRecording(d);
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

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.9;

    const audioSrc = audioCtx.createMediaStreamSource(stream);

    const sourceNode = audioCtx.createBufferSource();
    const splitter = audioCtx.createChannelSplitter();

    sourceNode.connect(splitter);

    splitter.connect(analyser, 0, 0);

    audioSrc.connect(analyser);
    sourceNode.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;

    const data = new Uint8Array(bufferLength);

    recorder.start();
    let reqId;
    let cw = canvas.current.width;
    let ch = canvas.current.height;

    recorder.onstart = () => {
      setIsRecording(true);

      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, cw, ch);
      let barWidth = cw / bufferLength / 2;
      let barHeight;
      let x;

      console.log(barWidth);

      const draw = () => {
        analyser.getByteFrequencyData(data);
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(0, 0, cw, ch);
        x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = data[i] + 1;

          const red = (i * barHeight) / 6;
          const green = i * 4;
          const blue = (barHeight / 3) * i;

          ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
          ctx.fillRect(cw / 2 - x, ch / 2, barWidth, barHeight / 2);
          ctx.fillRect(cw / 2 - x, ch / 2, barWidth, -barHeight / 2);

          x += -barWidth;
        }

        for (let i = 0; i < bufferLength; i++) {
          barHeight = data[i] - 1;

          const red = (i * barHeight) / 6;
          const green = i * 4;
          const blue = barHeight / 3;

          ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
          ctx.fillRect(-x, ch / 2, barWidth, barHeight / 2);
          ctx.fillRect(-x, ch / 2, barWidth, -barHeight / 2);

          x += barWidth;
        }

        reqId = requestAnimationFrame(draw);
      };
      draw();
    };

    recorder.onstop = (e) => {
      window.cancelAnimationFrame(reqId);
      return setIsRecording(false);
    };

    recorder.ondataavailable = async (e) => {
      const file = new File([e.data], 'audio', { type: 'audio' });
      setFileList([file]);
      setFileType(file.type);
    };
  };

  const handleStop = () => {
    if (isRecording) {
      recorder.stop();
    }
  };

  return (
    <ChatInput
      canvas={canvas}
      fileType={fileType}
      value={messageValue}
      onSendMessage={onSendMessage}
      onChange={onChangeValue}
      setEmoji={setEmoji}
      toggleVisiblePicker={toggleVisiblePicker}
      visiblePicker={visiblePicker}
      record={Recording}
      handleStop={handleStop}
      isRecording={isRecording}
      uploaderProps={uploaderProps}
      uploading={uploading}
    />
  );
};

export default connect(
  ({ auth, dialogs }) => ({
    userId: auth.user.id,
    dialogId: dialogs.currentDialogId,
  }),
  messagesActions,
)(ChatInputContainer);
