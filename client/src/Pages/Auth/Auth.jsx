import React from 'react';
import { Switch, Route } from 'react-router-dom';
import InfoImg from '../../assets/img/Group.svg';
import Login from '../../modules/LoginForm/Login';
import Registration from '../../modules/RegistrationForm/Registration';
import './index.scss';

export const Auth = () => {
  return (
    <section className="auth-page">
      <div className="app-logo">TSChat</div>
      <div className="auth-page__content">
        <div className="auth-form__block">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </div>
        <div className="info__block">
          <img className="info__block-img" src={InfoImg} alt="" />
        </div>
      </div>
    </section>
  );
};
