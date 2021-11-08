import React from 'react';

import './index.scss';

import ChatListItem from '../ChatListItem';

import { Button, Input } from 'antd';

const Leftbar = () => {
  return (
    <div className="main__content-body__leftbar">
      <div className="leftbar__header chat__header">
        <div className="top-bar__search">
          <Input placeholder="Поиск разговоров..." />
        </div>
      </div>
      <div className="leftbar__body">
        <div className="leftbar__chats">
          <div className="leftbar__chats-header">
            <div className="chats__title">Диалоги</div>
            <div className="chats__control">
              <Button className="app-icon" type="text">
                <svg
                  className="icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="rect"
                    d="M12 4V20M20 12L4 12"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="leftbar__chats-body">
            <ChatListItem online />
            <ChatListItem online />
            <ChatListItem online />
            <ChatListItem online />
            <ChatListItem online />
            <ChatListItem online />
          </div>
        </div>
        <div className="leftbar__chats">
          <div className="leftbar__chats-header">
            <div className="chats__title">Беседы</div>
            <div className="chats__control">
              <Button className="app-icon" type="text">
                <svg
                  className="icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="rect"
                    d="M12 4V20M20 12L4 12"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="leftbar__chats-body">
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
            <ChatListItem type="conv" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
