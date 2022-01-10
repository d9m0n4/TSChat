import React from 'react';

import './index.scss';
import { Button } from 'antd';

import vkIcon from '../../assets/img/icons/vk.svg';
import instIcon from '../../assets/img/icons/instagram.png';
import tmIcon from '../../assets/img/icons/telegram.svg';
import UserAttach from '../UserAttach';
import { Link } from 'react-router-dom';
import UserAvatar from '../Avatar';

const Rightbar = ({ currentDialogId, partner }) => {
  if (!currentDialogId && !partner) {
    return null;
  }
  return (
    <div className="main__content-body__rightbar">
      <div className="rightbar__header chat__header">
        <Button className="app-icon" type="text">
          <svg
            className="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="rect"
              d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
              stroke="#979797"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      <div className="rightbar__body rightbar__dialog">
        <div className="rightbar__dialog-companion__info">
          <div className="companion__avatar">
            <UserAvatar size={100} name={partner && partner.partner.name} />
          </div>
          <div className="companion__pers-info">
            <div className="companion__name">{partner && partner.partner.name}</div>
            <span className="online">в сети</span>
          </div>
          <div className="companion__social-links">
            <Link to="#">
              <img src={vkIcon} alt="" />
            </Link>
            <Link to="#">
              <img src={instIcon} alt="" />
            </Link>
            <Link to="#">
              <img src={tmIcon} alt="" />
            </Link>
          </div>
        </div>
        <div className="rightbar__dialog-companion__attachs">
          <div className="attachs__header">
            <div className="attachs__header-title">Вложения</div>
            <span className="attachs__header-icon">
              <svg
                width="16"
                height="16"
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 9L12 16L5 9"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <ul className="attachs__list">
            <UserAttach />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
