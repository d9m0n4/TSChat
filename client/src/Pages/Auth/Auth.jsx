import React from 'react';
import { Route } from 'react-router-dom';
import InfoImg from '../../assets/img/Group.svg';
import LoginForm from '../../modules/LoginForm/container/LoginForm';
import Registration from '../../modules/RegistrationForm/container/RegisterForm';
import verify from './components/verify';
import './index.scss';

export const Auth = () => {
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
