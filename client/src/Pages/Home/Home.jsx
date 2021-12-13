import React from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
const Home = (props) => {
  const { isLoading } = props;
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

export default connect(({ auth }) => ({ isLoading: auth.isLoading }))(Home);
