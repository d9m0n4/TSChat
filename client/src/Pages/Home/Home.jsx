import React from 'react';
import './index.scss';

import Sidebar from '../../components/SideBar';
import Messanger from '../../layouts/Messanger';
const Home = () => {
  return (
    <section className="home-page">
      <Sidebar />
      <Messanger />
    </section>
  );
};

export default Home;
