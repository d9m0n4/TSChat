import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.scss';

import UserAvatar from '../Avatar';
import toDate from '../../helpers/ToDate';

const ChatListItem = ({ online, id, partner, type, date, lastMessage, currentUser, path, title }) => {
  const { userId } = useSelector((state) => state.auth.user.id);
  const lastM = () => {
    return userId === currentUser ? `Вы: ${lastMessage}` : `${lastMessage}`;
  };

  return (
    <NavLink activeClassName="active" exact to={`/${path}/${id}`}>
      <div className="chats__item">
        <div className="chats__item-avatar">
          {online && <sup className="status-dot"></sup>}
          {type === 'conv' ?
              <UserAvatar name={title} size={36} />
              : <UserAvatar name={partner.name} size={36} src={partner.userAvatar}/>
          }
          <sub className="messages-count">{1}</sub>
        </div>
        <div className="chats__item-body">
          <div className="chats__item-top">
            <p className="item-name">{type === 'conv' ? title : partner.name}</p>
            {type === 'conv' ? '' : <span className="item-date">{toDate(date)}</span>}
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

export default React.memo(ChatListItem);
