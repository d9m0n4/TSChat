import React from 'react';
import LeftBar from '../containers/LeftBar';
import Messages from '../containers/Messages';
import RightBarContianer from '../containers/RightBar';

const Messanger = () => {
  return (
    <div className="main__content">
      <div className="main__content-body">
        <LeftBar />
        <Messages />
        <RightBarContianer />
      </div>
    </div>
  );
};

export default Messanger;
