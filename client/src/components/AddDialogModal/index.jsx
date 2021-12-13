import React from 'react';
import { Modal } from 'antd';
import './index.scss';

const AddDialogModal = ({ visible, close }) => {
  return (
    <Modal
      destroyOnClose="true"
      title="Поиск собеседника"
      visible={visible}
      footer={null}
      onCancel={close}>
      <div className="search-result-list">Search Result List</div>
    </Modal>
  );
};

export default AddDialogModal;
