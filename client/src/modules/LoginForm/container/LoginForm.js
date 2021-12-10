import { withFormik } from 'formik';
import openNotification from '../../../helpers/notifications/openNotification';
import store from '../../../store';
import authActions from '../../../store/actions/authActions';
import Login from '../Login';

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    password: '',
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
    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(authActions.login(...values))
      .then(({ user }) => {
        if (!user.isActivated) {
          setSubmitting(false);
          return props.history.push('/verify');
        }
        props.history.push('/');
      })
      .catch(({ response }) => openNotification('error', 'Ошибка', response.data.message, 2));
  },
  displayName: 'Login',
})(Login);
