import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Login = () => {
  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Регистрация</h2>
        <span>Пройдите регистрацию, чтобы войти в чат</span>
      </div>
      <div className="form-content">
        <Form name="normal_login" className="login-form">
          <Form.Item
            hasFeedback
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input size="large" placeholder="Электронная почта" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input size="large" placeholder="Введите имя" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password size="large" type="password" placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password2"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password size="large" type="password" placeholder="Повторите пароль" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button auth-btn">
              Зарегистрироваться
            </Button>
            <span className="login-link">
              Уже зарегистрированы? <Link to="/login"> Войти</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
