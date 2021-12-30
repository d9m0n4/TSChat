import React from 'react';
import { Avatar } from 'antd';

const UserAvatar = ({ name, size }) => {
  const firstChar = name ? name[0].toUpperCase() : '';
  return <Avatar size={size}>{firstChar} </Avatar>;
};

export default UserAvatar;
