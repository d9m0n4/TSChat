import React, { useEffect, useRef } from 'react';
import './index.scss';
import ChatInput from '../ChatInput';
import Message from '../Message';

const ChatMesaages = () => {
  const scrollRef = useRef();

  const messagess = [
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'E', text: 'qweqweqweqwe', isMe: true },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'E', text: 'qweqweqweqwe', isMe: true },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'E', text: 'qweqweqweqwe', isMe: true },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
    { name: 'C', text: 'qweqweqweqwe', isMe: false },
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="main__content-body__messages">
      <div className="messages__header chat__header">
        <div className="messages__header-chat__title">Сократ</div>
        <div className="messages__header-chat__status online"></div>
      </div>

      <div className="messages__body">
        <div className="messages">
          {messagess.map((m, i) => (
            <div key={i} ref={scrollRef}>
              <Message text={m.text} isMe={m.isMe} name={m.name} />
            </div>
          ))}
        </div>
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatMesaages;
