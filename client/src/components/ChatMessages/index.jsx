import React from 'react';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';
import Typing from '../../components/Typing';
import { Avatar, Tooltip } from 'antd';
import UserAvatar from '../Avatar';

import './index.scss';

const ChatMessages = ({
  isTyping,
  typingUser,
  scrollRef,
  messages,
  user,
  currentDialogId,
  currentConvId,
  currentPartner,
  currentConv,
  scrollHandler,
  loader,
}) => {
  return (
    <>
      <div className="main__content-body__messages">
        <div className="messages__header chat__header">
          <div className="chat__header-title">
            {currentPartner && (currentConvId || currentDialogId) ? (
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

        {currentDialogId || currentConvId ? (
          <>
            <div className="messages__body">
              <>
                <div className="messages" ref={scrollRef} onScroll={scrollHandler}>
                  {loader ? (
                    <Loader />
                  ) : (
                    <>
                      {messages.map((m) => (
                        <Message
                          key={m._id}
                          attachments={m.attachments}
                          isMe={user === m.user._id}
                          date={m.createdAt}
                          text={m.text}
                          name={m.user.name}
                          user={m.user}
                          serverMessage={m.server}
                          readStatus={m.readStatus}
                        />
                      ))}
                    </>
                  )}
                  {messages.length > 0 && isTyping && typingUser && <Typing user={typingUser} />}
                </div>
              </>
            </div>
            <ChatInputContainer />
          </>
        ) : (
          <div className="messages__empty-block">
            <MailOutlined className="empty__icon" />
            <p>Здесь будут отображаться сообщения Ваших диалогов</p>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(ChatMessages);
