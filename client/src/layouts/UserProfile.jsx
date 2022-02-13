import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../components/Avatar';

import locale from 'antd/es/date-picker/locale/ru_RU';

import vkIcon from '../assets/img/icons/vk.svg';
import instIcon from '../assets/img/icons/instagram.png';
import tgIcon from '../assets/img/icons/telegram.svg';
import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Upload } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import { useEffect } from 'react';

const UserProfile = () => {
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [url, setUrl] = useState(null);

  const openModal = () => {
    setVisible(true);
  };

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => setUrl(imageUrl));
    }
  };

  return (
    <div className="profile__page">
      <Modal
        footer={false}
        onCancel={() => setVisible(false)}
        visible={visible}
        destroyOnClose={true}>
        <div className="modal__info">
          <Upload
            className="upload"
            accept=".jpg, .png, .gif"
            withCredentials={true}
            method="GET"
            maxCount={1}
            onChange={handleChange}
            showUploadList={false}>
            <UserAvatar size={96} src={url} />
          </Upload>
          <Form className="profile__info">
            <div className="form__item">
              <span className="form__item-label">Имя</span> <Input value="sdasdasdasd" />
            </div>
            <div className="form__item">
              <span className="form__item-label">Имя пользователя</span>
              <Input value="sdasdasdasd" />
            </div>
            <div className="form__item">
              <span className="form__item-label">Дата рождения</span> <DatePicker locale={locale} />
            </div>
          </Form>
        </div>
      </Modal>
      <div className="profile__page-user">
        <div className="profile__page-user__avatar">
          <UserAvatar
            className="upload__avatar"
            src={'https://res.cloudinary.com/dxyprpult/image/upload/v1644482958/file_tsvx7j.jpg'}
            name={'qwe'}
            size={128}
          />
        </div>
        <div className="profile__page-edit__btn">
          <Button onClick={openModal} type="text" icon={<EditOutlined />} />
        </div>
        <div className="profile__page-user__info">
          <div className="user__name user__info-item">
            <span>Имя:</span>Дмитрий Чесноков
          </div>
          <div className="user__nickname user__info-item">
            <span>Имя пользователя</span>D9m0n
          </div>
          <div className="user__birthday user__info-item">
            <span>Дата рождения:</span>02.08.1994
          </div>
          <ul className="social__links-list">
            <li className="social__links-item">
              <a defaultValue="#" href="http://vk.com/chester0208" target="_blank" rel="noreferrer">
                <img src={vkIcon} alt="vk" />
              </a>
            </li>
            <li className="social__links-item">
              <a
                defaultValue="#"
                href="https://www.instagram.com/d9m0n4ik/"
                target="_blank"
                rel="noreferrer">
                <img src={instIcon} alt="inst" />
              </a>
            </li>
            <li className="social__links-item">
              <a defaultValue="#" href="https://t.me/D9m0n4ik" target="_blank" rel="noreferrer">
                <img src={tgIcon} alt="tg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile__page-attachments">123</div>
    </div>
  );
};

export default UserProfile;
