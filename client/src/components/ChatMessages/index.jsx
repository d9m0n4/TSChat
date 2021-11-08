import React from 'react';
import './index.scss';
import ChatInput from '../ChatInput';
import Message from '../Message';

const ChatMesaages = () => {
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="messages__header-chat__title">Сократ</div>
        <div className="messages__header-chat__status online"></div>
      </div>

      <div className="messages__body">
        <div className="messages">
          <Message name="С" />
          <Message isMe name="Д" />
          <Message name="С" />
          <Message isMe name="Д" />
          <Message isMe name="Д" />
          <Message name="С" />
          <Message isMe name="Д" />
          <Message isMe name="Д" />
          <Message name="С" />
        </div>
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatMesaages;
