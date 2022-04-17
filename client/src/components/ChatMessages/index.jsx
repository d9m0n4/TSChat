import React from 'react';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';
import Typing from '../../components/Typing';
import { Avatar, Tooltip } from 'antd';
import UserAvatar from '../Avatar';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  getMessagesHistory,
  offset,
  messagesCount,
}) => {
  const getData = () => {
    return getMessagesHistory(currentDialogId || currentConvId, offset);
  };
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
              <div className="messages__body-screen">
                <>
                  <div id="scrollableDiv" className="messages__list">
                    <InfiniteScroll
                      dataLength={messages.length}
                      next={getData}
                      hasMore={true}
                      inverse={true}
                      scrollableTarget="scrollableDiv">
                      <div className="messages__container">
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
                      </div>
                    </InfiniteScroll>
                  </div>
                </>
                <ChatInputContainer />
              </div>
            </div>
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
