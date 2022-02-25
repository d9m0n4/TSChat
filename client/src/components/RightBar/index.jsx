import React from 'react';

import UserAttach from '../UserAttach';
import UserAvatar from '../Avatar';

import './index.scss';

const Rightbar = ({ currentDialogId, currentConvId, conversations, partner, attachments }) => {
  if (!currentDialogId || !partner || !currentConvId) {
    return null;
  }

  return (
    <div className="main__content-body__rightbar">
      <div className="rightbar__header chat__header"></div>
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
              <UserAttach attachments={attachments} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
