import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { Route, Switch, withRouter } from 'react-router';
import dialogActions from '../../store/actions/dialogActions';
import UserProfile from '../../layouts/UserProfile';

const Home = ({ setCurrentDialogId, isLoading, location, setCurrentPartner, dialogsItems }) => {
  useEffect(() => {
    const path = location.pathname;
    const dialogId = path.split('/').pop();
    setCurrentDialogId(dialogId);
    if (dialogsItems) {
      let partner = dialogsItems.filter((dialog) => dialog.dialogId === dialogId)[0];
      setCurrentPartner(partner);
    }
  }, [location.pathname, setCurrentDialogId, dialogsItems, setCurrentPartner]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="home-page">
          <Sidebar />
          <Switch>
            <Route path={'/dialogs'} component={Messanger} />
            <Route path={'/profile'} component={UserProfile} />
          </Switch>
        </section>
      )}
    </>
  );
};

export default withRouter(
  connect(
    ({ auth, dialogs }) => ({
      isLoading: auth.isLoading,
      dialogsItems: dialogs.dialogs,
    }),
    dialogActions,
  )(Home),
);
