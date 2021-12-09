import { notification } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default (message, description, duration) => {
  notification.open({
    type: 'info',
    message,
    description,
    duration,
  });
};
