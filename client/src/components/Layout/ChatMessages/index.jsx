import React from 'react';
import Message from '../Message';

import ChatInputContainer from '../../../containers/ChatInput';

import UserAvatar from '../../Shared/Avatar';
import Loader from '../../Shared/Loader';
import OnlineStatus from '../../UI/OnlineStatus';
import Typing from '../../UI/Typing';

import { MailOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import classNames from 'classnames';

import './index.scss';

const ChatMessages = ({
  isTyping,
  typingUser,
  messages,
  user,
  currentDialogId,
  currentConvId,
  currentPartner,
  currentConv,
  loader,
  showScrollButton,
  getData,
  scrollBtnActive,
  scrollToBottom,
  scrollBlock,
  setShown,
  rightBarActive,
  messageRef,
}) => {
  return (
    <>
      <div className="main__content-body__messages">
        <div className="messages__header chat__header">
          {(currentConvId || currentDialogId) && (
            <div className="chat__header-title">
              {currentPartner ? (
                <>
                  <div className="messages__header-chat__title">{currentPartner.name}</div>
                  {currentPartner.isOnline && <OnlineStatus />}
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
          )}
          {(currentConv || currentPartner) && (
            <div className="chat__header-btn" onClick={setShown}>
              <span className={rightBarActive ? 'active' : undefined} />
            </div>
          )}
        </div>

        {currentDialogId || (currentConvId && currentConv) ? (
          <>
            <div className="messages__body">
              <div
                className={classNames('scroll__button', scrollBtnActive && 'active')}
                onClick={scrollToBottom}>
                <svg
                  className="svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="rect"
                    d="M15 9L8 16L1 9M15 1L8 8L1 1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {loader && <Loader />}
              <div className="messages__screen" id="scrollableDiv" ref={scrollBlock}>
                <InfiniteScroll
                  className="messages__container"
                  dataLength={messages.length}
                  onScroll={showScrollButton}
                  next={getData}
                  inverse={true}
                  hasMore={true}
                  scrollableTarget="scrollableDiv">
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
                  {messages.length > 0 && isTyping && typingUser && <Typing user={typingUser} />}
                </InfiniteScroll>
              </div>
            </div>
            <ChatInputContainer currentConversationId={currentConvId} />
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
