import React from 'react';
import './index.scss';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';
import { useState } from 'react';
<<<<<<< HEAD
import {Avatar} from "antd";
import UserAvatar from "../Avatar";

const ChatMessages = ({ scrollRef, messages, user, currentDialogId, loader, currentPartner, currentConv }) => {
=======
import {Avatar, Tooltip} from "antd";
import UserAvatar from "../Avatar";

const ChatMessages = ({ scrollRef, messages, user, currentDialogId, currentConvId, loader, currentPartner, currentConv }) => {
>>>>>>> e93a6b8 (добавление собеседников)
  const [active, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!active);
  };

<<<<<<< HEAD
=======

>>>>>>> e93a6b8 (добавление собеседников)
  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="chat__header-title">
<<<<<<< HEAD
          <div className="messages__header-chat__title">
            {currentPartner ? currentPartner.partner.name : currentConv && (
                <div className='chat__title-conv'>
                    <div className='chat__title-conv__name'>{currentConv && currentConv.title}</div>
                    <Avatar.Group maxCount={2}>
                        {currentConv && currentConv.members.map(item => (
                            <UserAvatar key={item.id} src={item.avatar} size={36} name={item.name} />
                        ))}
                    </Avatar.Group>
                </div>
            )}
          </div>
          {currentPartner && <div className="messages__header-chat__status online"></div>}
=======
            {currentPartner ? <>
                <div className="messages__header-chat__title">
                    {currentPartner.partner.name}
                </div>
                <div className="messages__header-chat__status online" />
            </> :
                  (
                      <Avatar.Group  maxCount={2}>
                          {currentConv && currentConv.members.map(item => (
                              <Tooltip key={item.id} title={item.name} placement='top'>
                                  <UserAvatar size={32} src={item.avatar} name={item.name}/>
                              </Tooltip>
                          ))}
                      </Avatar.Group>
                )
            }
>>>>>>> e93a6b8 (добавление собеседников)
        </div>
        <div className="chat__header-btn">
          <span onClick={toggleClass} className={active ? 'active' : ''} />
        </div>
      </div>

      <div className="messages__body">
        {loader ? (
          <Loader />
        ) : (
          <div className="messages">
            {(currentDialogId || currentConvId)  && messages ? (
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

      {!loader && (currentDialogId || currentConvId) && messages && messages.length > 0 && <ChatInputContainer />}
    </div>
  );
};

export default React.memo(ChatMessages);
