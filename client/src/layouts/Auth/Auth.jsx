import React from 'react';
import { Route } from 'react-router-dom';
import InfoImg from '../../assets/img/Group.svg';
import LoginForm from '../../containers/LoginForm';
import Registration from '../../containers/RegisterForm';
import verify from '../../Pages/Verify/verify';
import './index.scss';

const Auth = () => {
  return (
    <section className="auth-page">
      <div className="app-logo">TSChat</div>
      <div className="auth-page__content">
        <div className="auth-form__block">
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/verify" component={verify} />
        </div>
        <div className="info__block">
          <img className="info__block-img" src={InfoImg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Auth;
