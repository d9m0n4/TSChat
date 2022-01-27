import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';
import { CloseCircleTwoTone } from '@ant-design/icons';

const ChatInputContainer = ({ dialogId, sendMessage }) => {
  const [messageValue, setMessageValue] = useState('');
  const [visiblePicker, setVisiblePicker] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

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
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].originFileObj;
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
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);

    console.log(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = (e) => {
      console.log('e', e);
      return setIsRecording(false);
    };

    recorder.ondataavailable = async (e) => {
      const file = new File([e.data], 'audio');
      const { data } = await Files.upload(file);
      sendMessage({
        dialogId: dialogId,
        text: null,
        attachments: data.file._id,
      });
    };
  };

  const handleStop = () => {
    if (isRecording) {
      recorder.stop();
    }
  };

  return (
    <ChatInput
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
