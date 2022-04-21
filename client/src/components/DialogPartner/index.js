import React from 'react';
import UserAvatar from '../Avatar';

const DialogPartner = ({ name, userAvatar, isOnline }) => {
  return (
    <div className="rightbar__dialog-companion__info">
      <div className="companion__avatar">
        <UserAvatar size={100} name={name} src={userAvatar} />
      </div>
      <div className="companion__pers-info">
        <div className="companion__name">{name}</div>
        <span className="online">{isOnline ? 'в сети' : 'не в сети'}</span>
      </div>
    </div>
  );
};

export default DialogPartner;
