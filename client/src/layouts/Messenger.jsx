import React from 'react';
import LeftBar from '../containers/LeftBar';
import Messages from '../containers/Messages';
import RightBarContainer from '../containers/RightBar';

const Messenger = () => {
  return (
    <>
      <div className="main__content">
        <div className="main__content-body">
          <LeftBar />
          <Messages />
          <RightBarContainer />
        </div>
      </div>
    </>
  );
};

export default Messenger;
