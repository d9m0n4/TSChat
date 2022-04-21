import { Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import UserAvatar from '../Avatar';
import OnlineStatus from '../onlineStatus';

const ConversationUser = ({ isOnline, name, avatar }) => {
  useEffect(() => {
    console.log('isOnline', isOnline);
  }, [isOnline]);
  return (
    <li className="conversation-member__item">
      <div className="conversation-member__item__avatar">
        {isOnline && <OnlineStatus />}
        <UserAvatar size={36} name={name} src={avatar} />
      </div>
      <div className="conversation-member__item__name">{name}</div>
      <div className="conversation-member__item__control">
        <Popconfirm placement="left" title="Покинуть беседу?">
          <svg
            className="icon"
            width="10"
            height="10"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="rect"
              d="M1 13L13 1M1 1L13 13"
              stroke="#979797"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Popconfirm>
      </div>
    </li>
  );
};

export default ConversationUser;
