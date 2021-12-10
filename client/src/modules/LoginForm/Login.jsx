import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import checkField from '../../helpers/fieldStatus/CheckField';

const Login = ({
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  touched,
  values,
  isSubmitting,
}) => {
  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Войти</h2>
        <span>Войдите в свой аккаунт</span>
      </div>
      <div className="form-content">
        <Form onFinish={handleSubmit} name="normal_login" className="login-form">
          <Form.Item hasFeedback validateStatus={checkField('email', touched, errors)}>
            <Input
              required={true}
              touched={touched}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              size="large"
              placeholder="Введите email"
              value={values.email}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </Form.Item>

          <Form.Item hasFeedback validateStatus={checkField('password', touched, errors)}>
            <Input.Password
              required={true}
              touched={touched}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              size="large"
              placeholder="Введите пароль"
              value={values.password}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
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
