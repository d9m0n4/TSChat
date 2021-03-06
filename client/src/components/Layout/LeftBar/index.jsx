import React from 'react';
import './index.scss';

import { Button, Input } from 'antd';

import ChatListItem from '../ChatListItem';
import AddDialogModal from '../../Shared/AddDialogModal';
import Loader from '../../Shared/Loader';
import TextArea from 'antd/lib/input/TextArea';
import { CONVERSATION_PATH, DIALOG_PATH } from '../../../constants';
import OpenModalButton from '../../UI/OpenModalButton';

const Leftbar = ({
  conversations,
  convTitle,
  setConvTitle,
  inputValue,
  convUsers,
  dialogs,
  messageValue,
  visible,
  convVisible,
  showModal,
  userId,
  hideModal,
  selectedUserId,
  users,
  onSearch,
  onSelect,
  onChangeValue,
  onChangeInput,
  onSendMessage,
  onCreateConv,
  isLoading,
  showConvModal,
  hideConvModal,
  handleChangeSelect,
}) => {
  return (
    <>
      <AddDialogModal
        userId={userId}
        close={hideModal}
        onSelect={onSelect}
        onSearch={onSearch}
        title="Поиск собеседника"
        visible={visible}
        users={users}>
        {selectedUserId && (
          <>
            <div className="add-dialog-form__input">
              <TextArea
                onChange={onChangeValue}
                className="textfield"
                placeholder="Введите сообщение... "
                autoSize={{ minRows: 1, maxRows: 5 }}
                value={messageValue}
              />
              <Button
                disabled={!messageValue}
                onClick={onSendMessage}
                type="text"
                className="messages-input__send app-icon">
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="rect"
                    d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12"
                    stroke="#979797"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </>
        )}
      </AddDialogModal>
      <AddDialogModal
        userId={userId}
        title="Создать беседу"
        users={users}
        onSearch={onSearch}
        multiple={true}
        close={hideConvModal}
        visible={convVisible}
        handleChange={handleChangeSelect}>
        <Input
          placeholder="Введите название беседы"
          required={true}
          value={convTitle}
          onChange={setConvTitle}
        />
        <div className="add-dialog-form-btn">
          <Button disabled={!convUsers.length || !convTitle} shape="round" onClick={onCreateConv}>
            Создать беседу
          </Button>
        </div>
      </AddDialogModal>
      <div className="main__content-body__leftbar">
        <div className="leftbar__header chat__header">
          <div className="top-bar__search">
            <Input value={inputValue} onChange={onChangeInput} placeholder="Поиск разговоров..." />
          </div>
        </div>
        <div className="leftbar__body">
          <div className="leftbar__chats">
            <div className="leftbar__chats-header">
              <div className="chats__title">Диалоги</div>
              <div className="chats__control">
                <OpenModalButton fn={showModal} />
              </div>
            </div>

            <div className="leftbar__chats-body">
              {isLoading ? (
                <Loader />
              ) : (
                dialogs &&
                dialogs.map((dialog) => (
                  <ChatListItem
                    key={dialog.dialogId}
                    id={dialog.dialogId}
                    userId={dialog.lastMessage && dialog.lastMessage.user}
                    partner={dialog.partner}
                    date={dialog.lastMessage.createdAt || new Date()}
                    path={DIALOG_PATH}
                    lastMessage={dialog.lastMessage}
                    unreadCount={dialog.count}
                    readStatus={dialog.lastMessage.readStatus}
                    isOnline={dialog.partner.isOnline}
                  />
                ))
              )}
            </div>
          </div>
          <div className="leftbar__chats">
            <div className="leftbar__chats-header">
              <div className="chats__title">Беседы</div>
              <div className="chats__control">
                <OpenModalButton fn={showConvModal} />
              </div>
            </div>
            <div className="leftbar__chats-body">
              {conversations &&
                conversations.map((conversation) => (
                  <ChatListItem
                    type="conv"
                    title={conversation.title}
                    lastConvMessage={conversation.lastMessage ? conversation.lastMessage : ''}
                    key={conversation.id}
                    path={CONVERSATION_PATH}
                    id={conversation.id}
                    date={conversation.lastMessage ? conversation.lastMessage.createdAt : null}
                    unreadCount={conversation.count}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Leftbar);
