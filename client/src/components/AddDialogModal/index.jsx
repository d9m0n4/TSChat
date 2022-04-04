import React from 'react';
import { Modal, Select, Form } from 'antd';

import './index.scss';
import UserAvatar from '../Avatar';

const AddDialogModal = ({
  children,
  visible,
  close,
  onSelect,
  onSearch,
  users,
  userId,
  title,
  multiple,
  handleChange,
  footer,
}) => {
  const options =
    users &&
    users.length &&
    users
      .filter((user) => {
        return user._id !== userId;
      })
      .map((u) => (
        <Select.Option className="modal__result-col" key={u._id}>
          <div className="modal__result-col__name">
            <UserAvatar size={24} name={u.name} src={u.userAvatar} />
            <span className="modal__result-col__name">{u.name}</span>
          </div>
          <span className="modal__result-col__status">онлайн</span>
        </Select.Option>
      ));

  return (
    <Modal
      className="dialog__modal"
      destroyOnClose="true"
      title={title}
      visible={visible}
      footer={null}
      onCancel={close}>
      <Form className="add-dialog-form">
        <Select
          mode={multiple && 'multiple'}
          className="modal__result"
          style={{ width: '100%' }}
          labelInValue
          placeholder="Введите имя собеседника"
          filterOption={false}
          onSearch={onSearch}
          onSelect={onSelect}
          onChange={handleChange}
          showArrow={false}
          notFoundContent={null}
          defaultActiveFirstOption={false}
          showSearch>
          {options}
        </Select>
      </Form>
      {children}
    </Modal>
  );
};

export default AddDialogModal;
