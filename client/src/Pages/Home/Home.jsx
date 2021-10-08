import React from 'react';
import { Link } from 'react-router-dom';

import { Input } from 'antd';
import './index.scss';

import messageIcon from '../../assets/img/icons/message-circle.svg';
import bookmarkIcon from '../../assets/img/icons/bookmark.svg';
import settingsIcon from '../../assets/img/icons/settings.svg';
import logOutIcon from '../../assets/img/icons/log-out.svg';

import Avatar from '../../assets/img/Group18.png';

const Home = () => {
  return (
    <section className="home-page">
      <div className="sidebar">
        <div className="user__profile-link">
          <div className="user__avatar">
            <img src={Avatar} alt="" />
          </div>
        </div>
        <nav className="sidebar__navigation">
          <ul className="nav-group">
            <li className="nav-group__item">
              <Link to="#">
                <img src={messageIcon} alt="" />
              </Link>
            </li>
            <li className="nav-group__item">
              <Link to="#">
                <img src={bookmarkIcon} alt="" />
              </Link>
            </li>
          </ul>
          <ul className="nav-group">
            <li className="nav-group__item">
              <Link to="#">
                <img src={settingsIcon} alt="" />
              </Link>
            </li>
            <li className="nav-group__item">
              <Link to="#">
                <img src={logOutIcon} alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main__content">
        <div className="top-bar">
          <div className="top-bar__search">
            <Input />
          </div>
          <div className="top-bar__"></div>
          <div className="top-bar__controls"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
