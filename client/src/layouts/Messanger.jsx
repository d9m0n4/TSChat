import React from 'react';
import Rightbar from '../components/RightBar';
import LeftBar from '../containers/LeftBar';
import Messages from '../containers/Messages';

const Messanger = () => {
  return (
    <div className="main__content">
      <div className="main__content-body">
        <LeftBar />
        <Messages />
        <Rightbar />
      </div>
    </div>
  );
};

export default Messanger;
