import { withFormik } from 'formik';
import Registration from '../Registration';

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    name: '',
    password: '',
    password2: '',
  }),

  validate: (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Введите email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Введен не корректный email';
    }

    if (!values.password) {
      errors.password = 'Введите пароль';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)) {
      errors.password = 'Слишком легкий пароль';
    }

    if (values.password2 !== values.password) {
      errors.password2 = 'Пароли не совпадают';
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  },

  displayName: 'Registration',
})(Registration);