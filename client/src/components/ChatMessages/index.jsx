import React from 'react';
import './index.scss';
import ChatInput from '../ChatInput';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';

const ChatMesaages = ({ scrollRef, messages, user, currentPartner }) => {
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="messages__header-chat__title">{currentPartner}</div>
        <div className="messages__header-chat__status online"></div>
      </div>

      <div className="messages__body">
        <div className="messages">
          {messages ? (
            messages.map((m) => (
              <div key={m._id} ref={scrollRef}>
                <Message
                  isMe={user === m.user._id}
                  date={m.createdAt}
                  text={m.text}
                  name={m.name}
                />
              </div>
            ))
          ) : (
            <div className="messages__empty-block">
              <MailOutlined className="empty__icon" />
              <p>Здесь будут отображаться сообщения Ваших диалогов</p>
            </div>
          )}
        </div>
      </div>

      {messages && <ChatInput />}
    </div>
  );
};

export default ChatMesaages;
