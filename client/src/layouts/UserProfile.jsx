import React from 'react';
import UserAvatar from '../components/Avatar';

const UserProfile = () => {
  return (
    <div className="profile__page">
      <div className="profile__page-user">
        <div className="profile__page-user__avatar">
          <UserAvatar
            src={'https://res.cloudinary.com/dxyprpult/image/upload/v1644482958/file_tsvx7j.jpg'}
            name={'qwe'}
            size={128}
          />
        </div>
        <div className="profile__page-user__info">
          <div className="user__name">
            <span>Имя:</span>grach grach grach
          </div>
          <div className="user__birthday">
            <span>Дата рождения:</span>02.08.1994
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
