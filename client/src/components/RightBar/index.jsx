import React from 'react';

import './index.scss';

import UserAttach from '../UserAttach';
import DialogPartner from '../DialogPartner';
import ConversationUser from '../ConversationUser';

const Rightbar = ({
  currentDialogId,
  currentConvId,
  conversation,
  partner,
  attachments,
  currentUserId,
}) => {
  return (
    <>
      {(currentDialogId || currentConvId) && (
        <div className="main__content-body__rightbar">
          <div className="rightbar__header chat__header"></div>
          {partner ? (
            <div className="rightbar__body rightbar__dialog">
              <DialogPartner
                name={partner.name}
                userAvatar={partner.userAvatar}
                isOnline={partner.isOnline}
                lastSeen={partner.lastSeen}
              />
              <div className="rightbar__dialog-companion__attachs">
                <div className="attachs__header">
                  <div className="attachs__header-title">Вложения</div>
                  <span className="attachs__header-icon">
                    <svg
                      width="16"
                      height="16"
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        className="path"
                        d="M19 9L12 16L5 9"
                        stroke="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div className="attaches__group">
                  <ul className="attachs__group-list">
                    <UserAttach attachments={attachments && attachments} />
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <>
              {conversation && (
                <div className="rightbar__body rightbar__conversation">
                  <>
                    <div className="rightbar__conversation-header">Участиники беседы</div>
                    {conversation.creator && (
                      <div className="rightbar__conversation-creator">
                        <ConversationUser
                          isOnline={conversation.creator.isOnline}
                          name={conversation.creator.name}
                          avatar={conversation.creator.avatar}
                          currentUserId={currentUserId}
                          userId={conversation.creator.id}
                          currentConvId={currentConvId}
                          id={conversation.creator.id}
                        />
                      </div>
                    )}
                    {
                      <ul className="rightbar__conversation-members">
                        {conversation.members
                          .filter((member) => member.id !== conversation.creator.id)
                          .map((item) => (
                            <ConversationUser
                              key={item.id}
                              isOnline={item.isOnline}
                              name={item.name}
                              avatar={item.avatar}
                              userId={item.id}
                              currentUserId={currentUserId}
                              creator={conversation.creator.id}
                              currentConvId={currentConvId}
                              id={item.id}
                            />
                          ))}
                      </ul>
                    }
                  </>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Rightbar;
