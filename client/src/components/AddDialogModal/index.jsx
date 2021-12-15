import React from 'react';
import { Modal, Select } from 'antd';
import './index.scss';
import Form from 'antd/lib/form/Form';
import ChatInput from '../ChatInput';
import Avatar from 'antd/lib/avatar/avatar';

const AddDialogModal = ({ visible, close, onSelect, selectedUserId }) => {
  const users = [
    { name: 'Александр Пушкин', id: 1 },
    { name: 'Сергей Есенин', id: 2 },
    { name: 'Федор Достаевский', id: 3 },
  ];

  const onSearch = (value) => {
    console.log(value);
  };

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
          {users.map((u) => (
            <Select.Option className="modal__result-col" key={u.id}>
              <Avatar size={24}></Avatar>
              <span className="modal__result-col__name">{u.name}</span>онлайн
            </Select.Option>
          ))}
        </Select>
      </Form>

      {selectedUserId && <ChatInput />}
    </Modal>
  );
};

export default AddDialogModal;
