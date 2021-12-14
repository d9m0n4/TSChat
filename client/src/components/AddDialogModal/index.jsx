import React from 'react';
import { Divider, Input, Modal, Row, Select } from 'antd';
import './index.scss';
import TextArea from 'antd/lib/input/TextArea';
import Form from 'antd/lib/form/Form';

const AddDialogModal = ({ visible, close }) => {
  return (
    <Modal
      destroyOnClose="true"
      title="Поиск собеседника"
      visible={visible}
      footer={null}
      onCancel={close}>
      <div className="search-result-list"></div>
      <Form className="add-dialog-form">
        <Input placeholder="Поиск собеседника..." />
        <Divider type="horizontal" orientation="left" plain>
          Результат поиска
        </Divider>
      </Form>
      <TextArea autosize={{ minRows: 3, maxRows: 10 }}></TextArea>
    </Modal>
  );
};

export default AddDialogModal;
