import React from 'react';

import './index.scss';

import { NavLink } from 'react-router-dom';
import UserAvatar from '../Avatar';
import { connect } from 'react-redux';
import toDate from '../../helpers/ToDate';

const ChatListItem = ({ online, id, name, type, date, lastMessage, userId, currentUser }) => {
  console.log(date && date);
  const lastM = () => {
    return userId === currentUser ? `Вы: ${lastMessage}` : `${lastMessage}`;
  };

  return (
    <NavLink activeClassName="active" to={`/dialog/${id}`}>
      <div className="chats__item">
        <div className="chats__item-avatar">
          {online && <sup className="status-dot"></sup>}
          <UserAvatar name={name} size={36} />
          <sub className="messages-count">{1}</sub>
        </div>
        <div className="chats__item-body">
          <div className="chats__item-top">
            <p className="item-name">{name}</p>
            <span className="item-date">{toDate(date && date)}</span>
          </div>
          {type === 'conv' ? (
            <div className="chats__item-bottom conv">
              <div className="conv__sender">Экономист:</div>
              <div className="conv__message">Шо как мужуки???</div>
            </div>
          ) : (
            <div className="chats__item-bottom">
              <div className="item__message">
                <p>{lastM()}</p>
              </div>
              <div className="item__status"></div>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default connect(({ auth }) => ({ currentUser: auth.user.id }))(React.memo(ChatListItem));
