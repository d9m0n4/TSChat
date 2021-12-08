import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Registration = ({
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  touched,
  values,
  isSubmitting,
}) => {
  const checkField = (key, touched, errors) => {
    if (touched[key]) {
      if (errors[key]) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return '';
    }
  };

  return (
    <div className="auth-form__block-wrapper">
      <div className="form-title">
        <h2>Регистрация</h2>
        <span>Пройдите регистрацию, чтобы войти в чат</span>
      </div>
      <div className="form-content">
        <Form onSubmit={handleSubmit} name="normal_login" className="login-form">
          <Form.Item hasFeedback validateStatus={checkField('email', touched, errors)}>
            <Input
              style={{ position: 'relative' }}
              required={true}
              touched={touched}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              size="large"
              placeholder="Введите email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </Form.Item>

          <Form.Item hasFeedback validateStatus={checkField('name', touched, errors)}>
            <Input
              style={{ position: 'relative' }}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              value={values.name}
              size="large"
              placeholder="Введите имя"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </Form.Item>

          <Form.Item hasFeedback validateStatus={checkField('password', touched, errors)}>
            <Input.Password
              touched={touched}
              style={{ position: 'relative' }}
              required={true}
              name="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              size="large"
              type="password"
              placeholder="Введите пароль"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </Form.Item>

          <Form.Item hasFeedback validateStatus={checkField('password2', touched, errors)}>
            <Input.Password
              style={{ position: 'relative' }}
              required={true}
              onBlur={handleBlur}
              onChange={handleChange}
              name="password2"
              value={values.password2}
              size="large"
              type="password"
              placeholder="Повторите пароль"
            />
            {errors.password2 && <span className="error-message">{errors.password2}</span>}
          </Form.Item>

          <Form.Item>
            <Button
              onClick={handleSubmit}
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

export default Registration;
