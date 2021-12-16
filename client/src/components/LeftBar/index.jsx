import React from 'react';
import './index.scss';

import ChatListItem from '../ChatListItem';

import { Button, Input } from 'antd';
import AddDialogModal from '../AddDialogModal';

const Leftbar = ({ visible, showModal, hideModal, onSelect, selectedUserId, dialog, onSearch }) => {
  return (
    <>
      <AddDialogModal
        selectedUserId={selectedUserId}
        onSelect={onSelect}
        visible={visible}
        close={hideModal}
        onSearch={onSearch}
      />
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
                <Button onClick={showModal} className="app-icon" type="text">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div></div>
            <div className="leftbar__chats-body">
              <ChatListItem online dialog={dialog} />
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="leftbar__chats-body">
              <ChatListItem type="conv" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftbar;
