import React from 'react';
import { Button, Modal, Select } from 'antd';
import './index.scss';
import Form from 'antd/lib/form/Form';
import Avatar from 'antd/lib/avatar/avatar';
import TextArea from 'antd/lib/input/TextArea';

const AddDialogModal = ({
  messageValue,
  onSendMessage,
  visible,
  close,
  onSelect,
  onChangeValue,
  selectedUserId,
  onSearch,
  users,
  uploading,
  userId,
}) => {
  const options = users
    .filter((user) => {
      return user._id !== userId;
    })
    .map((u) => (
      <Select.Option className="modal__result-col" key={u._id}>
        <div className="modal__result-col__name">
          <Avatar size={24} />
          <span className="modal__result-col__name">{u.name}</span>
        </div>
        <span className="modal__result-col__status">онлайн</span>
      </Select.Option>
    ));

  return (
    <Modal
      destroyOnClose="true"
      title="Поиск собеседника"
      visible={visible}
      footer={null}
      onCancel={close}>
      <Form className="add-dialog-form">
        <Select
          className="modal__result"
          style={{ width: '100%' }}
          labelInValue
          placeholder="Введите имя собеседника"
          filterOption={false}
          onSearch={onSearch}
          onSelect={onSelect}
          showArrow={false}
          showSearch>
          {options}
        </Select>
      </Form>

      {selectedUserId && (
        <>
          <div className="add-dialog-form__input">
            <TextArea
              disabled={uploading}
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
    </Modal>
  );
};

export default AddDialogModal;
