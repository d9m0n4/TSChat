import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../api/socket';
import LeftBar from '../containers/LeftBar';
import Messages from '../containers/Messages';
import RightBarContainer from '../containers/RightBar';

import { user } from '../store/selectors';

const Messenger = () => {
  const { id } = useSelector(user);

  useEffect(() => {
    socket.emit('CLIENT:ONLINE', { userId: id });

    return () => {
      socket.removeListener('CLIENT:ONLINE');
    };
  }, [id]);

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
