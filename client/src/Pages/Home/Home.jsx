import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router';
import Loader from '../../components/Loader';
import dialogActions from '../../store/actions/dialogActions';
import conversationActions from '../../store/actions/conversatiosActions';
import UserProfile from '../../layouts/UserProfile';

const Home = ({
  setCurrentDialogId,
  isLoading,
  setCurrentPartner,
  dialogsItems,
  setCurrentConversationId,
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
    } else {
      const conversationId = pathname.split('/conversation/').pop();
      setCurrentConversationId(conversationId);
      setCurrentDialogId(null);
      setCurrentPartner(null);
    }
  }, [pathname, setCurrentDialogId, setCurrentConversationId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
            <Route path={['/dialogs', '/conversation']} component={Messanger} />
            <Route path={'/profile'} component={UserProfile} />
          </Switch>
        </section>
      )}
    </>
  );
};

export default connect(
  ({ auth, dialogs }) => ({
    isLoading: auth.isLoading,
    dialogsItems: dialogs.dialogs,
  }),
  { ...dialogActions, ...conversationActions },
)(Home);
