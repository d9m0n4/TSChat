import React from 'react';

import UserAvatar from '../Avatar';
import LeaveConv from '../LeaveConversation';
import OnlineStatus from '../OnlineStatus';

const ConversationUser = ({
  isOnline,
  name,
  avatar,
  userId,
  currentUserId,
  creator,
  currentConvId,
  id,
}) => {
  return (
    <li className="conversation-member__item">
      <div className="conversation-member__item__avatar">
        {isOnline && <OnlineStatus />}
        <UserAvatar size={36} name={name} src={avatar} />
      </div>
      <div className="conversation-member__item__name">{name}</div>
      {userId === currentUserId && (
        <div className="conversation-member__item__control">
          <LeaveConv
            currentConvId={currentConvId}
            currentUserId={currentUserId}
            id={id}
            title="Покинуть беседу?"
          />
        </div>
      )}
      {creator === currentUserId && (
        <LeaveConv
          id={id}
          currentConvId={currentConvId}
          currentUserId={currentUserId}
          title="Исключить из беседы?"
        />
      )}
    </li>
  );
};

export default ConversationUser;
