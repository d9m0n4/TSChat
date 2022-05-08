import { withFormik } from 'formik';
import openNotification from '../helpers/notifications/openNotification';
import validateForm from '../helpers/validators/validateField';
import store from '../store';
import authActions from '../store/actions/authActions';
import Registration from '../Pages/Registration/Registration';

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
    validateForm(values, errors);
    return errors;
  },

  handleSubmit: (values, { setSubmitting, props, resetForm }) => {
    store
      .dispatch(authActions.registration(values))
      .then(({ data }) => {
        openNotification(
          'success',
          'Успех',
          `Пользователь ${data.user.name} успешно зарегистрирован`,
          2,
        );
        setTimeout(() => {
          props.history.push('/verify');
        }, 3000);
      })
      .catch(({ response }) => {
        openNotification('error', 'Ошибка', response.data.message, 5);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
      });
  },

  displayName: 'Registration',
})(Registration);
