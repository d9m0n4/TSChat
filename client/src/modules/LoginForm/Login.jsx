import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import store from '../../store';
import authActions from '../../store/actions/authActions';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (values) => {
    store.dispatch(authActions.login(values));
  };

  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Войти</h2>
        <span>Войдите в свой аккаунт</span>
      </div>
      <div className="form-content">
        <Form onFinish={handleSubmit} name="normal_login" className="login-form">
          <Form.Item
            hasFeedback
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              size="large"
              type="email"
              placeholder="Электронная почта"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              size="large"
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              type="primary"
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
