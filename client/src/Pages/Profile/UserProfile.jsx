import React from 'react';

import UserAvatar from '../../components/Shared/Avatar';

import locale from 'antd/es/date-picker/locale/ru_RU';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, DatePicker, Image, Input, Upload, Empty } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';

import { Formik } from 'formik';

import Files from '../../Services/Files';
import Users from '../../Services/Users';

import formatDate from '../../helpers/formateDate';
import openNotification from '../../helpers/notifications/openNotification';

import moment from 'moment';

import './index.scss';

const UserProfile = ({
  setVisible,
  visible,
  user,
  openModal,
  userFiles,
  audioRef,
  togglePlay,
  isPlaying,
  fileList,
  date,
  handleChangeAvatar,
  url,
  onChange,
}) => {
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
              name: user && user.name,
              nickName: user ? user.nickName : '',
              email: user && user.email,
              date: user && user.birthday,
              info: user && user.info,
            }}
            onSubmit={async (values) => {
              if (fileList) {
                const file = fileList[0];
                let res = null;
                if (typeof file === 'object') {
                  res = await Files.upload(fileList[0]);
                } else {
                  res = user.userAvatar;
                }

                await Users.updateUser({
                  ...values,
                  date: date ? date : user.birthday,
                  avatar: res ? res.data.file.thumb : undefined,
                  user: user.id,
                })
                  .then(() => {
                    setVisible(false);
                  })
                  .catch(() => {
                    openNotification('warning', 'Ошибка', 'Что то пошло не так!', 3);
                  });
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
                      <DatePicker
                        picker="date"
                        onChange={onChange}
                        format="DD.MM.YYYY"
                        name="date"
                        value={date && date}
                        defaultValue={moment(user.birthday)}
                        locale={locale}
                      />
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
            src={user && user.avatar}
            name={user && user.name}
            size={128}
          />
        </div>
        <div className="profile__page-edit__btn">
          <Button onClick={openModal} type="text" icon={<EditOutlined className="edit-btn" />} />
        </div>
        <div className="profile__page-user__info">
          <div className=" user__info-item">
            <span>Имя:</span>
            {user && user.name}
          </div>
          <div className=" user__info-item">
            <span>Имя пользователя</span>
            {user ? user.nickName : '-'}
          </div>
          <div className=" user__info-item">
            <span>E-mail</span>
            {user && user.email}
          </div>
          <div className=" user__info-item">
            <span>Дата рождения:</span>
            {user && user.birthday ? formatDate(user.birthday) : '-'}
          </div>
          <div className=" user__info-item">
            <span>Дополнительная информация:</span>
            {user ? user.info : '-'}
          </div>
        </div>
      </div>
      <div className="profile__page-attachments">
        {userFiles && userFiles.length > 0 ? (
          <>
            <div className="profile__page-attachments__title">Матриалы Ваших сообщений</div>
            <ul className="profile__page-attachments__list">
              {userFiles &&
                userFiles.map((item) => (
                  <li key={item._id} className="attachments__list-item">
                    {item && item.isAudio ? (
                      <div key={item._id} className="attachments__audio">
                        <audio id="audio" ref={audioRef} src={item.url} preload="metadata" />

                        <div className="attachments__audio-info">
                          <div className="attachments__audio-btn">
                            <Button type="link" onClick={togglePlay}>
                              {isPlaying ? (
                                <svg
                                  id="svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    className="path"
                                    d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="#3A456B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  id="svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    className="path"
                                    d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z"
                                    stroke="#3A456B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    className="path"
                                    d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="#3A456B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        loading="lazy"
                        className="message__image"
                        preview={{
                          icons: [],
                          destroyOnClose: true,
                          src: `${item.url}`,
                          mask: <EyeOutlined />,
                        }}
                        src={item.thumb}
                      />
                    )}
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <Empty description="Здесь будут отображаться вложения Ваших сообщений" />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
