import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const [formData, SetFormData] = useState([]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Регистрация</h2>
        <span>Пройдите регистрацию, чтобы войти в чат</span>
      </div>
      <div className="form-content">
        <Form onFinish={(values) => SetFormData(values)} name="normal_login" className="login-form">
          <Form.Item
            hasFeedback
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input value="email" size="large" placeholder="Электронная почта" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input value="name" size="large" placeholder="Введите имя" />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              value="password"
              size="large"
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            name="password2"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              value="password_2"
              size="large"
              type="password"
              placeholder="Повторите пароль"
            />
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
