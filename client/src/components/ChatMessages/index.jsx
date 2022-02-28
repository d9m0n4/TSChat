import React from 'react';
import './index.scss';
import Message from '../Message';
import { MailOutlined } from '@ant-design/icons';
import ChatInputContainer from '../../containers/ChatInput';
import Loader from '../../components/Loader';
import { useState } from 'react';
import {Avatar} from "antd";
import UserAvatar from "../Avatar";

const ChatMessages = ({ scrollRef, messages, user, currentDialogId, loader, currentPartner, currentConv }) => {
  const [active, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!active);
  };

  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="chat__header-title">
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
        </div>
        <div className="chat__header-btn">
          <span onClick={toggleClass} className={active ? 'active' : ''}></span>
        </div>
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

      {!loader && currentDialogId && messages && messages.length > 0 && <ChatInputContainer />}
    </div>
  );
};

export default React.memo(ChatMessages);
