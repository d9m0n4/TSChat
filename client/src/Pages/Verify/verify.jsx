import React from 'react';
import { Link } from 'react-router-dom';

const verify = () => {
  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Активация аккаунта</h2>
        <span>Пользователь не активирован</span>
      </div>
      <div className="form-content ta-center">
        Для того, что бы войти в приложение, необходимо активировать Ваш аккаунт. Проверьте свою
        электронную почту.
      </div>
      <div className="form-link">
        <Link to="/login">Войти</Link>
      </div>
    </div>
  );
};

export default verify;
