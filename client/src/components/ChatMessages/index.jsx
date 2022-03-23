import React from 'react';
import './index.scss';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';
import Typing from '../../components/Typing';
import { useState } from 'react';
import { Avatar, Tooltip } from 'antd';
import UserAvatar from '../Avatar';
import { useSelector } from 'react-redux';

import rightBarActions from '../../store/actions/rightbar';

const ChatMessages = ({
  isTyping,
  typingUser,
  scrollRef,
  messages,
  user,
  currentDialogId,
  currentConvId,
  loader,
  currentPartner,
  currentConv,
  type,
}) => {
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="chat__header-title">
          {currentPartner ? (
            <>
              <div className="messages__header-chat__title">{currentPartner.partner.name}</div>
              <div className="messages__header-chat__status online" />
            </>
          ) : (
            <Avatar.Group maxCount={2}>
              {currentConv &&
                currentConv.members.map((item) => (
                  <Tooltip key={item.id} title={item.name} placement="top">
                    <UserAvatar size={32} src={item.avatar} name={item.name} />
                  </Tooltip>
                ))}
            </Avatar.Group>
          )}
        </div>
        <div className="chat__header-btn">
          <span className="active" />
        </div>
      </div>

      <div className="messages__body">
        {loader ? (
          <Loader />
        ) : (
          <div className="messages">
            {(currentDialogId || currentConvId) && messages ? (
              messages.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  <Message
                    attachments={m.attachments}
                    isMe={user === m.user._id}
                    date={m.createdAt}
                    text={m.text}
                    name={m.user.name}
                    user={m.user}
                    serverMessage={m.server}
                  />
                </div>
              ))
            ) : (
              <div className="messages__empty-block">
                <MailOutlined className="empty__icon" />
                <p>Здесь будут отображаться сообщения Ваших диалогов</p>
              </div>
            )}
            {isTyping && typingUser && <Typing user={typingUser} />}
          </div>
        )}
      </div>

      {!loader && (currentDialogId || currentConvId) && messages && messages.length > 0 && (
        <ChatInputContainer />
      )}
    </div>
  );
};

export default React.memo(ChatMessages);
