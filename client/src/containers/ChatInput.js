import { useState } from 'react';
import ChatInput from '../components/ChatInput';

const ChatInputContainer = () => {
  const [messageValue, setMessageValue] = useState(null);

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const onSendMessage = () => {
    console.log(messageValue);
    setMessageValue(null);
  };

  return <ChatInput value={messageValue} onSendMessage={onSendMessage} onChange={onChangeValue} />;
};

export default ChatInputContainer;
