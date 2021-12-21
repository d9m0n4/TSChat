import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import { withRouter } from 'react-router';
import dialogActions from '../../store/actions/dialogActions';

const Home = ({ setCurrentDialogId, isLoading, location }) => {
  useEffect(() => {
    const path = location.pathname;
    const dialogId = path.split('/').pop();
    setCurrentDialogId(dialogId);
  }, [location.pathname, setCurrentDialogId]);
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
  connect(({ auth }) => ({ isLoading: auth.isLoading }), dialogActions)(Home),
);
