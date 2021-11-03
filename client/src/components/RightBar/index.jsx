import React from 'react';

import './index.scss';
import { Avatar } from 'antd';

import controlsIcon from '../../assets/img/icons/controls.svg';
import vkIcon from '../../assets/img/icons/vk.svg';
import instIcon from '../../assets/img/icons/instagram.png';
import tmIcon from '../../assets/img/icons/telegram.svg';
import UserAttach from '../UserAttach';

const Rightbar = () => {
  return (
    <div className="main__content-body__rightbar">
      <div className="rightbar__header chat__header">
        <a href="#">
          <img src={controlsIcon} alt="" />
        </a>
      </div>
      <div className="rightbar__body rightbar__dialog">
        <div className="rightbar__dialog-companion__info">
          <div className="companion__avatar">
            <Avatar size={100} />
          </div>
          <div className="companion__pers-info">
            <div className="companion__name">Сократ</div>
            <span className="online">в сети</span>
          </div>
          <div className="companion__social-links">
            <a href="#">
              <img src={vkIcon} alt="" />
            </a>
            <a href="#">
              <img src={instIcon} alt="" />
            </a>
            <a href="#">
              <img src={tmIcon} alt="" />
            </a>
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
