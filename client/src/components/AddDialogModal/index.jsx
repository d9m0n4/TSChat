import React from 'react';
import { Modal, Select } from 'antd';
import './index.scss';
import Form from 'antd/lib/form/Form';
import ChatInput from '../ChatInput';
import Avatar from 'antd/lib/avatar/avatar';

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
  textValue,
}) => {
  const options = users.map((u) => (
    <Select.Option className="modal__result-col" key={u._id}>
      <div className="modal__result-col__name">
        <Avatar size={24}></Avatar>
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
        <ChatInput onSendMessage={onSendMessage} value={messageValue} onChange={onChangeValue} />
      )}
    </Modal>
  );
};

export default AddDialogModal;
