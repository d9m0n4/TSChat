import React from 'react';
import UserAvatar from '../../Shared/Avatar';

import './index.scss';

const Typing = ({ user }) => {
  return (
    <div className="typing__message">
      <div className="typing__message-user">
        <UserAvatar size={36} name={user.name} src={user.avatar} />
      </div>
      <span className="typing__message-dot" />
      <span className="typing__message-dot" />
      <span className="typing__message-dot" />
    </div>
  );
};

export default Typing;
