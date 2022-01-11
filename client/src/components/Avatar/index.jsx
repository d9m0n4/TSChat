import React from 'react';
import { Avatar } from 'antd';

import colorFromStr from '../../helpers/colorFromHash';

const UserAvatar = ({ name, size }) => {
  const firstChar = name ? name[0].toUpperCase() : '';

  return (
    <Avatar
      style={{
        fontWeight: '600',
        background: `linear-gradient(to left bottom, #${colorFromStr(name, 3)}, #${colorFromStr(
          name,
          7,
        )})`,
      }}
      draggable={true}
      size={size}>
      {firstChar}{' '}
    </Avatar>
  );
};

export default UserAvatar;
