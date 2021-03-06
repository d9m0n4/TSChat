import { notification } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default (type = 'info', message, description, duration) => {
  return notification.open({
    type,
    message,
    description,
    duration,
  });
};
