import React from 'react';

import { Input } from 'antd';
import './index.scss';

const { TextArea } = Input;

const ChatInput = () => {
  return (
    <>
      <div className="messages__body-input__buttons"></div>
      <div className="messages__body-input__textarea">
        <TextArea placeholder="Введите сообщение... " autoSize={{ minRows: 3, maxRows: 5 }} />
      </div>
      <div className="messages__body-input__send"></div>
    </>
  );
};

export default ChatInput;
