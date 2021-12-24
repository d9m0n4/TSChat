import { useState } from 'react';
import { connect } from 'react-redux';
import ChatInput from '../components/ChatInput';
import messagesActions from '../store/actions/messagesActions';

const ChatInputContainer = ({ userId, dialogId, sendMessage }) => {
  const [messageValue, setMessageValue] = useState(null);

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const onSendMessage = () => {
    console.log(messageValue);

    sendMessage({
      dialogId: dialogId,
      text: messageValue,
    });

    setMessageValue(null);
  };

  return <ChatInput value={messageValue} onSendMessage={onSendMessage} onChange={onChangeValue} />;
};

export default connect(
  ({ auth, dialogs }) => ({
    userId: auth.user.id,
    dialogId: dialogs.currentDialogId,
  }),
  messagesActions,
)(ChatInputContainer);
