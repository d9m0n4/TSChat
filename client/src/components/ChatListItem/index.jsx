import React from 'react';

import './index.scss';

import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

const ChatListItem = ({ online, dialog, type }) => {
  return (
    <Link to={`${dialog}`}>
      <div className="chats__item">
        <div className="chats__item-avatar">
          {online && <sup className="status-dot"></sup>}
          <Avatar
            size={40}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
          />
          <sub className="messages-count">{dialog && dialog.value}</sub>
        </div>
        <div className="chats__item-body">
          <div className="chats__item-top">
            <p className="item-name">qwe</p>
            <span className="item-date">21.04.2021</span>
          </div>
          {type === 'conv' ? (
            <div className="chats__item-bottom conv">
              <div className="conv__sender">Экономист:</div>
              <div className="conv__message">Шо как мужуки???</div>
            </div>
          ) : (
            <div className="chats__item-bottom">
              <div className="item__message">{dialog && dialog.value}</div>
              <div className="item__status"></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
