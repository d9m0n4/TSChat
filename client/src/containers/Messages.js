import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMessages from '../components/ChatMessages';
import socket from '../core/socket';
import messagesActions from '../store/actions/messagesActions';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Messages = ({
  fetchMessages,
  currentDialogId,
  currentPartner,
  items,
  user,
  dialogs,
  loader,
  addMessage,
}) => {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current && scrollRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [items]);

  const newMessage = (data) => {
    addMessage(data);
  };

  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
      socket.on('SERVER:CREATE_MESSAGE', newMessage);
    }
    return () => {
      socket.removeListener('SERVER:CREATE_MESSAGE');
    };
  }, [currentDialogId, fetchMessages]);

  const dateToNow = (date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <ChatMessages
      user={user}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      loader={loader}
      dialogs={dialogs}
      currentPartner={currentPartner && currentPartner}
      dateToNow={dateToNow}
    />
  );
};

export default connect(
  ({ dialogs, messages, auth }) => ({
    dialogs: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
    currentPartner: dialogs.currentPartner,
    items: messages.items,
    loader: messages.loader,
    user: auth.user.id,
  }),
  { ...messagesActions },
)(Messages);
