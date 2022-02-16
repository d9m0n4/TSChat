import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../components/Avatar';

import locale from 'antd/es/date-picker/locale/ru_RU';

import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import { useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Formik } from 'formik';
import Files from '../Services/Files';
import Users from '../Services/Users';
import socket from '../core/socket';

import authActions from '../store/actions/authActions';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [url, setUrl] = useState(user.avatar);

  const openModal = () => {
    setVisible(true);
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChangeAvatar = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => setUrl(imageUrl));
    }
    setFileList([info.file.originFileObj]);
  };

  useEffect(() => {
    socket.on('getCurrentUser', () => {
      dispatch(authActions.getCurrentUser());
    });
    return () => {
      socket.removeListener('getCurrentUser');
    };
  }, [dispatch]);

  useEffect(() => {
    const get = async (id) => {
      await Files.get(id).then((data) => console.log(data));
    };
    get(user.id);
  }, [user.id]);

  return (
    <div className="profile__page">
      <Modal
        footer={false}
        onCancel={() => setVisible(false)}
        visible={visible}
        destroyOnClose={true}>
        <div className="modal__info">
          <Formik
            initialValues={{
              name: user.name,
              nickName: user.nickName ? user.nickName : '',
              email: user.email,
              date: null,
              info: user.info,
            }}
            onSubmit={async (values) => {
              if (fileList.length) {
                const res = await Files.upload(fileList[0]);
                await Users.updateUser({ ...values, avatar: res.data.file.thumb, user: user.id });
              }
            }}>
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
              <>
                <Upload
                  className="upload"
                  accept=".jpg, .png, .gif"
                  withCredentials={true}
                  method="GET"
                  maxCount={1}
                  onChange={handleChangeAvatar}
                  showUploadList={false}>
                  <UserAvatar size={96} name={user.name} src={url} />
                </Upload>
                <Form onFinish={handleSubmit} className="profile__info">
                  <div className="form__item">
                    <span className="form__item-label">Имя</span>
                    <div className="form__item-input">
                      <Input value={values.name} name="name" onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form__item">
                    <span className="form__item-label">Имя пользователя</span>
                    <div className="form__item-input">
                      <Input value={values.nickName} onChange={handleChange} name="nickName" />
                    </div>
                  </div>
                  <div className="form__item">
                    <span className="form__item-label">E-mail</span>
                    <div className="form__item-input">
                      <Input value={values.email} onChange={handleChange} name="email" />
                    </div>
                  </div>
                  <div className="form__item">
                    <span className="form__item-label">Дата рождения:</span>{' '}
                    <div className="form__item-input">
                      <DatePicker value={values.date} name="date" locale={locale} />
                    </div>
                  </div>
                  <div className="form__item info">
                    <span className="form__item-label">Дополнительная информация:</span>
                    <div className="form__item-input">
                      <TextArea
                        onChange={handleChange}
                        name="info"
                        autoSize={{ minRows: 2, maxRows: 5 }}
                        value={values.info}
                      />
                    </div>
                  </div>
                  <Button
                    disabled={isSubmitting}
                    htmlType="submit"
                    className="form__button"
                    shape="round">
                    Сохранить
                  </Button>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </Modal>
      <div className="profile__page-user">
        <div className="profile__page-user__avatar">
          <UserAvatar
            className="upload__avatar"
            src={user.avatar && user.avatar}
            name={user && user.name}
            size={128}
          />
        </div>
        <div className="profile__page-edit__btn">
          <Button onClick={openModal} type="text" icon={<EditOutlined />} />
        </div>
        <div className="profile__page-user__info">
          <div className="user__name user__info-item">
            <span>Имя:</span>
            {user && user.name}
          </div>
          <div className=" user__info-item">
            <span>Имя пользователя</span>
            {user.nickName ? user.nickName : '-'}
          </div>
          <div className=" user__info-item">
            <span>E-mail</span>
            {user && user.email}
          </div>
          <div className=" user__info-item">
            <span>Дата рождения:</span>
            {user.birthday ? user.birthday : '-'}
          </div>
          <div className=" user__info-item">
            <span>Дополнительная информация:</span>
            {user.info ? user.info : '-'}
          </div>
        </div>
      </div>
      <div className="profile__page-attachments">123</div>
    </div>
  );
};

export default UserProfile;
