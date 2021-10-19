import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'antd';

import { Input } from 'antd';
import './index.scss';

import messageIcon from '../../assets/img/icons/message-circle.svg';
import bookmarkIcon from '../../assets/img/icons/bookmark.svg';
import settingsIcon from '../../assets/img/icons/settings.svg';
import logOutIcon from '../../assets/img/icons/log-out.svg';
import controlsIcon from '../../assets/img/icons/controls.svg';
import plusIcon from '../../assets/img/icons/plus.svg';

const Home = () => {
  return (
    <section className="home-page">
      <div className="sidebar">
        <div className="user__profile-link">
          <Avatar size={48}>Д </Avatar>
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
        <div className="main__content-body">
          <div className="main__content-body__leftbar">
            <div className="leftbar__header chat__header">
              <div className="top-bar__search">
                <Input placeholder="Поиск разговоров..." />
              </div>
            </div>
            <div className="leftbar__body">
              <div className="leftbar__chats">
                <div className="leftbar__chats-header">
                  <div className="chats__title">Диалоги</div>
                  <div className="chats__control">
                    <a href="#">
                      <img src={plusIcon} alt="" />
                    </a>
                  </div>
                </div>
                <div className="leftbar__chats-body">
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar
                        size={40}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                      />
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Александр Пушкин</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom">
                        <div className="item__message">Шо как мужуки??? Есть че...</div>
                        <div className="item__status"></div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar
                        size={40}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                      />
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Александр Пушкин</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom">
                        <div className="item__message">Шо как мужуки??? Есть че...</div>
                        <div className="item__status"></div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar
                        size={40}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                      />
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Александр Пушкин</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom">
                        <div className="item__message">Шо как мужуки??? Есть че...</div>
                        <div className="item__status"></div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar
                        size={40}
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
                      />
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Александр Пушкин</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom">
                        <div className="item__message">Шо как мужуки??? Есть че...</div>
                        <div className="item__status"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="leftbar__chats">
                <div className="leftbar__chats-header">
                  <div className="chats__title">Беседы</div>
                  <div className="chats__control">
                    <a href="#">
                      <img src={plusIcon} alt="" />
                    </a>
                  </div>
                </div>
                <div className="leftbar__chats-body">
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar size={40}> Б </Avatar>
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Бухгалтерия</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom conv">
                        <div className="conv__sender">Экономист:</div>
                        <div className="conv__message">Шо как мужуки???</div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar size={40}> Б </Avatar>
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Бухгалтерия</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom conv">
                        <div className="conv__sender">Экономист:</div>
                        <div className="conv__message">Шо как мужуки???</div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar size={40}> Б </Avatar>
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Бухгалтерия</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom conv">
                        <div className="conv__sender">Экономист:</div>
                        <div className="conv__message">Шо как мужуки???</div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar size={40}> Б </Avatar>
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Бухгалтерия</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom conv">
                        <div className="conv__sender">Экономист:</div>
                        <div className="conv__message">Шо как мужуки???</div>
                      </div>
                    </div>
                  </div>
                  <div className="chats__item">
                    <div className="chats__item-avatar">
                      <Avatar size={40}> Б </Avatar>
                    </div>
                    <div className="chats__item-body">
                      <div className="chats__item-top">
                        <p className="item-name">Бухгалтерия</p>
                        <span className="item-date">21.04.2021</span>
                      </div>
                      <div className="chats__item-bottom conv">
                        <div className="conv__sender">Экономист:</div>
                        <div className="conv__message">Шо как мужуки???</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main__content-body__messages">
            <div className="messages__header chat__header">
              <div className="messages__header-chat__title">Сократ</div>
              <div className="messages__header-chat__status online"></div>
            </div>
            <div className="messages__body"></div>
          </div>
          <div className="main__content-body__rightbar">
            <div className="rightbar__chat-info">
              <div className="rightbar__header chat__header">
                <a href="#">
                  <img src={controlsIcon} alt="" />
                </a>
              </div>
              <div className="rightbar__body dialog__rightbar">123</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
