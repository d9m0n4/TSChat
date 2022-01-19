import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';

const ChatInputContainer = ({ userId, dialogId, sendMessage, addAttachments }) => {
  const [messageValue, setMessageValue] = useState('');
  const [attachments, setAttachments] = useState([]);
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
    if (fileList.length) {
      console.log(fileList);
      // .then((d) => {
      //   console.log(d);
      //   // sendMessage({
      //   //   dialogId: dialogId,
      //   //   text: messageValue || null,
      //   //   attachments: d.map((item) => item._id),
      //   // });
      // });
    }

    // sendMessage({
    //   dialogId: dialogId,
    //   text: messageValue || null,
    //   attachments: [],
    // });
    // setMessageValue('');
    // setFileList([]);
    // setAttachments([]);
  };

  const uploaderProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      setAttachments([]);
    },
    beforeUpload: (file) => {
      Files.upload(file).then((f) => setFileList([...fileList, f.data.file]));
    },
    fileList,
  };

  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mediaDevices.getUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;

  const Recording = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, (err) => {
        console.log(err);
      });
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
      if (sending) {
        const file = new File([e.data], 'audio.webm');

        const { data } = await Files.upload(file);
        return sendMessage({
          dialogId: dialogId,
          text: null,
          attachments: data.file._id,
        });
      }
      console.log('not sent');
    };
  };

  const handleStop = (e) => {
    if (isRecording) {
      recorder.stop();
    }
  };

  return (
    <ChatInput
      attachments={attachments}
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
