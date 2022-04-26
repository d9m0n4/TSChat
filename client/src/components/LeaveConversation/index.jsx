import { Popconfirm } from 'antd';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import conversationsActions from '../../store/actions/conversatiosActions';

const LeaveConv = ({ title, currentConvId, id }) => {
  const { leaveConversation } = useActions(conversationsActions);

  const leaveConv = () => {
    return leaveConversation({
      convId: currentConvId,
      user: id,
    });
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
