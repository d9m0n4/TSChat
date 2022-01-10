import React from 'react';
import { Avatar } from 'antd';

import colorFromStr from '../../helpers/colorFromHash';
import { useEffect } from 'react';
import { useState } from 'react';

const UserAvatar = ({ name, size }) => {
  const [color, setColor] = useState();
  const firstChar = name ? name[0].toUpperCase() : '';

  const colorOne = (name) => {
    return colorFromStr(name, 2);
  };

  useEffect(() => {
    setColor(colorFromStr(name, 5));
    console.log(color);
  }, [color]);

  return (
    <Avatar
      style={{
        background: `linear-gradient(to left bottom, #${colorFromStr(name, 3)}, #${colorFromStr(
          name,
          4,
        )})`,
      }}
      draggable={true}
      size={size}>
      {firstChar}{' '}
    </Avatar>
  );
};

export default UserAvatar;
