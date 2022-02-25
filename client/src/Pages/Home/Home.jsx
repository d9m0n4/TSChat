import React, { useEffect } from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import {Route, Switch, useLocation, useParams, useRouteMatch} from 'react-router';
import Loader from '../../components/Loader';
import dialogActions from '../../store/actions/dialogActions';
import UserProfile from '../../layouts/UserProfile';

const Home = ({ setCurrentDialogId, isLoading, setCurrentPartner, dialogsItems }) => {
  let {pathname} = useLocation()
  const c = useRouteMatch('/dialogs/')
  useEffect(() => {

    console.log(c)

  },  [pathname]);

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

export default
  connect(
    ({ auth, dialogs }) => ({
      isLoading: auth.isLoading,
      dialogsItems: dialogs.dialogs,
    }),
    dialogActions,
  )(Home)

