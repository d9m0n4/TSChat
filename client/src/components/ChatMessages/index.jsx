import React from 'react';
import './index.scss';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';

const ChatMesaages = ({ scrollRef, messages, user, currentDialogId, loader, currentPartner }) => {
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="messages__header-chat__title">
          {currentPartner && currentPartner.partner.name}
        </div>
        {currentPartner && <div className="messages__header-chat__status online"></div>}
      </div>

      <div className="messages__body">
        {loader ? (
          <Loader />
        ) : (
          <div className="messages">
            {currentDialogId && messages && messages ? (
              messages.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  <Message
                    attachments={m.attachments}
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

      {!loader && currentDialogId && messages.length > 0 && <ChatInputContainer />}
    </div>
  );
};

export default React.memo(ChatMesaages);
