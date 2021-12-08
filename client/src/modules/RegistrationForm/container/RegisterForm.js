import { withFormik } from 'formik';
import store from '../../../store';
import authActions from '../../../store/actions/authActions';
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

    if (!values.name) {
      errors.name = 'Укажите Ваше имя';
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

  handleSubmit: (values, { setSubmitting, props }) => {
    store.dispatch(authActions.registration(values));
    setSubmitting(false);
    props.history.push({
      pathname: '/verify',
      from: '/registration',
    });
  },

  displayName: 'Registration',
})(Registration);
