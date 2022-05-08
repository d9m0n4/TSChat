import { Popconfirm } from 'antd';
import React from 'react';
import OpenNotification from '../../../helpers/notifications/openNotification';
import Conversations from '../../../Services/Conversations';

const LeaveConv = ({ title, currentConvId, id }) => {
  const leaveConv = async () => {
    try {
      const data = await Conversations.leaveConversation({
        convId: currentConvId,
        user: id,
      });
      if (data.data) {
        OpenNotification('warning', 'Внимание!', data.data.message);
      }
    } catch (e) {
      return console.log('e', e);
    }
  };

  return (
    <div className="conversation-member__item__control">
      <Popconfirm
        onConfirm={() => leaveConv()}
        okText="Да"
        cancelText="Нет"
        placement="left"
        title={title}>
        <svg
          className="icon"
          width="10"
          height="10"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="rect"
            d="M1 13L13 1M1 1L13 13"
            stroke="#979797"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Popconfirm>
    </div>
  );
};

export default LeaveConv;
