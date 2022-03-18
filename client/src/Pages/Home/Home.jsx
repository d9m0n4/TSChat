import React, { useEffect, useRef } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messenger from '../../layouts/Messenger';
import { connect, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import Loader from '../../components/Loader';
import dialogActions from '../../store/actions/dialogActions';
import conversationActions from '../../store/actions/conversatiosActions';
import UserProfile from '../../layouts/UserProfile';
import Settings from '../../layouts/Settings';
import socket from '../../api/socket';

const Home = ({
  conversations,
  setCurrentDialogId,
  isLoading,
  setCurrentPartner,
  dialogsItems,
  setCurrentConversationId,
  currentConvId,
  userId,
}) => {
  let { pathname } = useLocation();
  const path = 'dialogs';

  useEffect(() => {
    if (pathname.includes(path)) {
      const dialogId = pathname.split(`/${path}/`).pop();
      setCurrentDialogId(dialogId);
      setCurrentConversationId(null);
      if (dialogsItems) {
        let partner = dialogsItems.filter((dialog) => dialog.dialogId === dialogId)[0];
        setCurrentPartner(partner);
      }
    }
    if (pathname.includes('/im/conversation/')) {
      const conversationId = pathname.split('/im/conversation/').pop();
      setCurrentConversationId(conversationId);
      setCurrentDialogId(null);
      setCurrentPartner(null);
    }
  }, [
    pathname,
    setCurrentDialogId,
    setCurrentConversationId,
    dialogsItems,
    setCurrentPartner,
    conversations,
    currentConvId,
  ]);

  const socketRef = useRef(socket);

  const id = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      socketRef.current.emit('user:add', id);
    }
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
            <Route path={['/im']} component={Messenger} />
            <Route path={'/profile'} component={UserProfile} />
            <Route path={'/settings'} component={Settings} />
          </Switch>
        </section>
      )}
    </>
  );
};

export default connect(
  ({ auth, dialogs, conversations }) => ({
    isLoading: auth.isLoading,
    dialogsItems: dialogs.dialogs,
    conversations: conversations.items,
    currentConvId: conversations.currentConvId,
  }),
  { ...dialogActions, ...conversationActions },
)(Home);
