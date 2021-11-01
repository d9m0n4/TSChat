import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'antd';

import { Input } from 'antd';
import './index.scss';

import controlsIcon from '../../assets/img/icons/controls.svg';
import vkIcon from '../../assets/img/icons/vk.svg';
import instIcon from '../../assets/img/icons/instagram.png';
import tmIcon from '../../assets/img/icons/telegram.svg';
import attach from '../../assets/img/word.png';
import Message from '../../components/Message';
import ChatInput from '../../components/ChatInput';

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
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="rect"
                    d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li className="nav-group__item">
              <Link to="#">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="rect"
                    d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
          </ul>
          <ul className="nav-group">
            <li className="nav-group__item">
              <Link to="#">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="rect"
                    d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    id="rect"
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li className="nav-group__item">
              <Link to="#">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    id="rect"
                    d="M8 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H8M16 16L20 12M20 12L16 8M20 12L8 12"
                    stroke="#979797"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 4V20M20 12L4 12"
                          stroke="#979797"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
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
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 4V20M20 12L4 12"
                          stroke="#979797"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
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
            <div className="messages__body">
              <div className="messages">
                <Message name="С" />
                <Message isMe name="Д" />
              </div>
            </div>
            <ChatInput />
          </div>
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
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                  <li className="attachs__list-item">
                    <div className="attachs__list-item__prevIcon">
                      <img src={attach} alt="" />
                    </div>
                    <div className="attachs__list-item__body">
                      <div className="item__body-top">
                        <p className="attach__title">Акт сверки 502 02.05.2021</p>
                      </div>
                      <div className="item__body-bottom">
                        <div className="attach__date">03.05.2021</div>
                        <div className="attach__size">24MB</div>
                      </div>
                    </div>
                    <div className="attachs__list-item__download">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          id="rect"
                          d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                          stroke="#111827"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
