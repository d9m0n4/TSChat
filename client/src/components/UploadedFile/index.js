import React, { useState } from 'react';

import { Upload, Modal } from 'antd';
import { useEffect } from 'react';
import Files from '../../Services/Files';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadedFile = ({ attachments }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: attachments,
  });

  useEffect(() => {
    setState({ ...state, fileList: attachments });
    console.log(state.fileList);
  }, [attachments]);

  const { previewVisible, previewImage, fileList, previewTitle } = state;

  const handleCancel = () => {
    console.log(123);
    setState({ ...state, previewVisible: false });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  const get = () => {
    console.log('asdadsas');
  };

  const handleChange = ({ fileList }) => {
    console.log(122222222222);
    setState({ ...state, fileList });
  };

  const handleRemove = (file) => {
    Files.delete(file.public_id);
  };

  return (
    <>
      <Upload
        action={get}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        onChange={handleChange}></Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default UploadedFile;
