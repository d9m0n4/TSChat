import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import LeftBar from '../containers/LeftBar';
import Messages from '../containers/Messages';
import RightBarContainer from '../containers/RightBar';

import { auth } from '../store/selectors';

const Messenger = () => {
  const { user } = useSelector(auth);
  return (
    <>
      {!user ? (
        <Loader />
      ) : (
        <div className="main__content">
          <div className="main__content-body">
            <LeftBar />
            <Messages />
            <RightBarContainer />
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
