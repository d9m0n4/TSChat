import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.scss';

import UserAvatar from '../Avatar';
import toDate from '../../helpers/ToDate';
import classNames from 'classnames';

const ChatListItem = ({
  online,
  userId,
  id,
  partner,
  type,
  date,
  lastMessage,
  path,
  title,
  lastConvMessage,
  unreadCount,
}) => {
  const { id: currentUser } = useSelector((state) => state.auth.user);

  const lastM = (id, message) => {
    const currentMessage = message.text ? message.text : 'вложение';
    return id === userId ? `Вы: ${currentMessage}` : `${currentMessage}`;
  };

  return (
    <NavLink activeClassName="active" exact to={`/im/${path}/${id}`}>
      <div className="chats__item">
        <div className="chats__item-avatar">
          {online && <sup className="status-dot" />}
          <UserAvatar
            name={(partner && partner.name) || title}
            size={36}
            src={partner && partner.userAvatar}
          />
          {unreadCount > 0 && <sub className="messages-count">{unreadCount}</sub>}
        </div>
        <div className="chats__item-body">
          <div className="chats__item-top">
            <p className="item-name">{type === 'conv' ? title : partner.name}</p>
            {date && <span className="item-date">{toDate(date)}</span>}
          </div>
          {type === 'conv' ? (
            <div className="chats__item-bottom conv">
              {lastConvMessage && (
                <>
                  <div className="conv__sender">{lastConvMessage.user.name}: </div>
                  <div className="item__message">
                    <p>{lastConvMessage.text || 'вложение'}</p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="chats__item-bottom">
              <div className="item__message">
                <p>{lastM(currentUser, lastMessage)}</p>
              </div>
              {lastMessage.user === currentUser && (
                <span
                  className={classNames(
                    'item__status',
                    !lastMessage.readStatus && 'active',
                  )}></span>
              )}
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default React.memo(ChatListItem);
