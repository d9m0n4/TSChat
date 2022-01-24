import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { withRouter } from 'react-router';
import dialogActions from '../../store/actions/dialogActions';

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
          <Messanger />
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
