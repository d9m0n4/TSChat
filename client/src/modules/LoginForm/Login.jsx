import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import SignIn from '../../Services/Auth';

const Login = () => {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const Auth = () => {
    SignIn(email, password);
  };

  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Войти</h2>
        <span>Войдите в свой аккаунт</span>
      </div>
      <div className="form-content">
        <Form name="normal_login" className="login-form">
          <Form.Item
            hasFeedback
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              size="large"
              placeholder="Электронная почта"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              onChange={(e) => SetPassword(e.target.value)}
              value={password}
              size="large"
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              onClick={Auth}
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button auth-btn">
              Войти
            </Button>
            <span className="login-link">
              Нет аккаунта? <Link to="/registration"> Зарегистрироваться</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
