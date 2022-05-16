import React from 'react';
import { Avatar } from 'antd';

import colorFromStr from '../../../helpers/colorFromHash';

const UserAvatar = ({ name, size, src, id }) => {
  const firstChar = name ? name[0].toUpperCase() : '';

  return (
    <Avatar
      src={src}
      style={
        !src && {
          background: `linear-gradient(135deg, #${colorFromStr(name, 6)} 0%, #${colorFromStr(
            name,
            5,
          )} 96.52%)`,
          fontWeight: '600',
        }
      }
      draggable={true}
      size={size}>
      {firstChar}{' '}
    </Avatar>
  );
};

export default UserAvatar;
