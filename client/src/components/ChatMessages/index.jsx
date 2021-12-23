import React from 'react';
import './index.scss';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';

const ChatMesaages = ({
  scrollRef,
  messages,
  user,
  currentPartner,
  currentDialogId,
  loader,
  currentDialog,
}) => {
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="messages__header-chat__title">{currentDialog.name}</div>
        <div className="messages__header-chat__status online"></div>
      </div>

      <div className="messages__body" ref={scrollRef}>
        {loader ? (
          <Loader />
        ) : (
          <div className="messages">
            {currentDialogId && messages && messages ? (
              messages.map((m) => (
                <div key={m._id}>
                  <Message
                    isMe={user === m.user._id}
                    date={m.createdAt}
                    text={m.text}
                    name={m.user.name}
                    user={m.user}
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
        )}
      </div>

      {!loader && currentDialogId && messages && <ChatInputContainer />}
    </div>
  );
};

export default ChatMesaages;
