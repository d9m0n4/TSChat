import React from 'react';
import UserAvatar from '../Avatar';
import toDate from '../../helpers/ToDate';
import classNames from 'classnames';

const DialogPartner = ({ name, userAvatar, isOnline, lastSeen }) => {
  return (
    <div className="rightbar__dialog-companion__info">
      <div className="companion__avatar">
        <UserAvatar size={100} name={name} src={userAvatar} />
      </div>
      <div className="companion__pers-info">
        <div className="companion__name">{name}</div>
        <span className={classNames(isOnline ? 'online' : 'offline')}>
          {isOnline ? 'в сети' : lastSeen ? `был в сети ${toDate(lastSeen)}` : ''}
        </span>
      </div>
    </div>
  );
};

export default DialogPartner;
