import React from 'react';

import UserAttach from '../UserAttach';
import UserAvatar from '../Avatar';

import './index.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';

const Rightbar = ({ currentDialogId, currentConvId, conversation, partner, attachments }) => {
  return (
    <div className="main__content-body__rightbar">
      <div className="rightbar__header chat__header"></div>
      {partner ? (
        <div className="rightbar__body rightbar__dialog">
          <div className="rightbar__dialog-companion__info">
            <div className="companion__avatar">
              <UserAvatar
                size={100}
                name={partner && partner.partner.name}
                src={partner && partner.partner.userAvatar}
              />
            </div>
            <div className="companion__pers-info">
              <div className="companion__name">{partner && partner.partner.name}</div>
              <span className="online">
                {partner && partner.partner.isOnline ? 'в сети' : 'не в сети'}
              </span>
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
            <div className="attaches__group">
              <ul className="attachs__group-list">
                <UserAttach attachments={attachments && attachments} />
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="rightbar__body rightbar__conversation">
          <div className="rightbar__conversation-header">Участиники беседы</div>
          <ul className="rightbar__conversation-members">
            {conversation &&
              conversation.members.map((item) => (
                <li key={item.id} className="conversation-member__item">
                  <div className="conversation-member__item__avatar">
                    {<sup className="status-dot"></sup>}
                    <UserAvatar size={36} name={item.name} src={item.avatar} />
                  </div>
                  <div className="conversation-member__item__name">{item.name}</div>
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </Popconfirm>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(Rightbar);
