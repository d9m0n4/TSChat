import { useState } from 'react';
import { connect } from 'react-redux';
import { useReactMediaRecorder } from 'react-media-recorder';
import ChatInput from '../components/ChatInput';
import Files from '../Services/Files';
import messagesActions from '../store/actions/messagesActions';

const ChatInputContainer = ({ userId, dialogId, sendMessage }) => {
  const [messageValue, setMessageValue] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [visiblePicker, setVisiblePicker] = useState(false);

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const onSendMessage = () => {
    sendMessage({
      dialogId: dialogId,
      text: messageValue,
      attachments: attachments.map((file) => file.uid),
    });

    setMessageValue('');
    setAttachments([]);
  };

  const setEmoji = (data) => {
    console.log(data);
    setMessageValue(messageValue + ' ' + data.native);
  };

  const toggleVisiblePicker = () => {
    setVisiblePicker(!visiblePicker);
  };

  const setFiles = async (files) => {
    let uploadedFiles = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      await Files.upload(element)
        .then(({ data }) => {
          console.log(data);
          uploadedFiles.push({
            status: 'done',
            uid: data.file._id,
            name: data.file.filename,
            url: data.file.url,
            public_id: data.file.pid,
          });
        })
        .catch((err) => console.log(err));
    }
    setAttachments(uploadedFiles);
  };

  return (
    <ChatInput
      attachments={attachments}
      setFiles={setFiles}
      value={messageValue}
      onSendMessage={onSendMessage}
      onChange={onChangeValue}
      setEmoji={setEmoji}
      toggleVisiblePicker={toggleVisiblePicker}
      visiblePicker={visiblePicker}
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
