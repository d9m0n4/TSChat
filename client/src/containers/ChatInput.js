import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';

const ChatInputContainer = ({ dialogId, sendMessage }) => {
  const [messageValue, setMessageValue] = useState('');
  const [visiblePicker, setVisiblePicker] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [sending, setSending] = useState(false);

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
    beforeUpload: () => {
      return false;
    },

    onChange: ({ fileList }) => {
      setFileList(fileList);
      console.log(fileList);
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
      navigator.getUserMedia({ audio: true }, onRecording, (err) => {
        console.log('err', err);
      });
    } else {
      console.log('userMedia not');
    }
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setRecorder(recorder);

    recorder.start();

    recorder.onstart = (e) => {
      console.log(e);
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setSending(true);
      setIsRecording(false);
    };

    recorder.ondataavailable = async (e) => {
      console.log(e.data);
      // if (sending) {
      //   const file = new File([e.data], 'audio');
      //   console.log(file);
      //   const { data } = await Files.upload(file);
      //   return sendMessage({
      //     dialogId: dialogId,
      //     text: null,
      //     attachments: data.file._id,
      //   });
      // }
      console.log('not sent');
    };
  };

  const handleStop = (e) => {
    if (isRecording) {
      recorder.stop();
    }
  };

  useEffect(() => {
    console.log(uploading);
  }, [uploading]);

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
      setSending={setSending}
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
