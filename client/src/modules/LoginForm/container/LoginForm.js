import { withFormik } from 'formik';
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

  handleSubmit: async (values, { resetForm, setSubmitting, props }) => {
    try {
      const data = await store.dispatch(authActions.login(values));
      if (data) {
        if (!data.user.isActivated) {
          return props.history.push('/verify');
        }
        props.history.push('/');
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  },
  displayName: 'Login',
})(Login);
