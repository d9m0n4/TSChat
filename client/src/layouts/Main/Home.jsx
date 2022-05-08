import React, { useEffect } from 'react';
import './index.scss';

import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';

import Sidebar from '../../components/Layout/SideBar';
import Loader from '../../components/Shared/Loader';

import dialogActions from '../../store/actions/dialogActions';
import notFoundPage from '../../Pages/404/404';
import UserProfile from '../../containers/Profile';
import Messenger from '../../Pages/Messenger/Messenger';
import Settings from '../../Pages/Settings/Settings';

import { CONVERSATION_PATH, DIALOG_PATH } from '../../constants';
import { useActions } from '../../hooks/useActions';
import { dialogs, auth } from '../../store/selectors';
import socket from '../../api/socket';

const Home = () => {
  const { setUserOnline } = useActions(dialogActions);

  const { currentDialogId } = useSelector(dialogs);
  const { user: currentUser } = useSelector(auth);

  useEffect(() => {
    socket.emit('CLIENT:GET_MESSAGES_COUNT', currentDialogId);
  }, [currentDialogId]);

  useEffect(() => {
    socket.on('SERVER:SOCKET_ONLINE', setUserOnline);
    socket.on('SERVER:SOCKET_OFFLINE', setUserOnline);

    return () => {
      socket.removeListener('SERVER:SOCKET_ONLINE');
      socket.removeListener('SERVER:SOCKET_OFFLINE');
      socket.removeListener('CLIENT:ONLINE');
    };
  });

  return (
    <>
      {!currentUser ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
            <Route exact path={'/'} component={Messenger} />
            <Route exact path={'/im'} component={Messenger} />
            <Route exact path={`/im/${DIALOG_PATH}/:id`} component={Messenger} />
            <Route exact path={`/im/${CONVERSATION_PATH}/:id`} component={Messenger} />
            <Route path={'/profile'} component={UserProfile} />
            <Route path={'/settings'} component={Settings} />
            <Route path="*" component={notFoundPage} />
          </Switch>
        </section>
      )}
    </>
  );
};

export default Home;
