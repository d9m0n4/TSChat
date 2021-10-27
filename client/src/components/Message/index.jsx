import { Avatar } from 'antd';
import React from 'react';

import classNames from 'classnames';

import './index.scss';

const Message = ({ isMe, name }) => {
  return (
    <div className={classNames('message', { 'message--isme': isMe })}>
      <div className="message__avatar">
        <Avatar size={36}>{name} </Avatar>
      </div>
      <div className="message__content">
        <div className="message__content-bubble">
          <p>А того, кто умеет ставить вопросы и давать ответы, мы называем диалектиком?</p>
        </div>
        <div className="message__content-date">Сегодня, в 13:46</div>
      </div>
    </div>
  );
};

export default Message;
