import React from 'react';
import ChatMesaages from '../components/ChatMessages';
import Leftbar from '../components/LeftBar';
import Rightbar from '../components/RightBar';

const Messanger = () => {
  return (
    <div className="main__content">
      <div className="main__content-body">
        <Leftbar />
        <ChatMesaages />
        <Rightbar />
      </div>
    </div>
  );
};

export default Messanger;
