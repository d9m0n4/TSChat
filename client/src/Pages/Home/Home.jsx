import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messenger from '../../layouts/Messenger';
import { useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import Loader from '../../components/Loader';
import dialogActions from '../../store/actions/dialogActions';
import conversationActions from '../../store/actions/conversatiosActions';
import UserProfile from '../../layouts/UserProfile';
import Settings from '../../layouts/Settings';
import { CONVERSATION_PATH, DIALOG_PATH } from '../../constants';
import { useActions } from '../../hooks/useActions';
import { conversations, dialogs, auth } from '../../store/selectors';
import socket from '../../api/socket';

const Home = () => {
  let { pathname } = useLocation();

  const { setCurrentDialogId, setCurrentPartner, setUserOnline } = useActions(dialogActions);
  const { setCurrentConversationId, setCurrentConversation } = useActions(conversationActions);

  const { items: convs, currentConvId } = useSelector(conversations);
  const { dialogs: dialogsItems, currentDialogId } = useSelector(dialogs);
  const { user: currentUser } = useSelector(auth);

  useEffect(() => {
    if (pathname.includes(DIALOG_PATH)) {
      const dialogId = pathname.split(`/${DIALOG_PATH}/`).pop();
      setCurrentDialogId(dialogId);
      setCurrentConversationId(null);
      if (dialogsItems) {
        for (const dialog of dialogsItems) {
          if (dialog.dialogId === dialogId) {
            setCurrentPartner(dialog.partner);
          }
        }
      }
    }
    if (pathname.includes(`/im/${CONVERSATION_PATH}/`)) {
      const conversationId = pathname.split(`/im/${CONVERSATION_PATH}/`).pop();
      setCurrentConversationId(conversationId);
      if (currentConvId) {
        let currentConv = convs.filter((item) => item.id === currentConvId)[0];
        setCurrentConversation(currentConv);
      }
      setCurrentDialogId(null);
      setCurrentPartner(null);
    }
    if (!pathname.includes(DIALOG_PATH)) {
      setCurrentDialogId(null);
      setCurrentPartner(null);
    }
  }, [
    pathname,
    setCurrentDialogId,
    setCurrentConversationId,
    dialogsItems,
    setCurrentPartner,
    convs,
    currentConvId,
    setCurrentConversation,
  ]);

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
  }, [setUserOnline]);

  return (
    <>
      {!currentUser ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
            <Route path={'/im'} component={Messenger} />
            <Route path={'/profile'} component={UserProfile} />
            <Route path={'/settings'} component={Settings} />
          </Switch>
        </section>
      )}
    </>
  );
};

export default Home;
