import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMesaages from '../components/ChatMessages';
import socket from '../core/socket';
import messagesActions from '../store/actions/messagesActions';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Messages = ({
  fetchMessages,
  currentDialogId,
  items,
  user,
  dialogs,
  loader,
  addMessage,
  currentPartner,
}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo({ top: 1000, behavior: 'smooth' });
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
    <ChatMesaages
      user={user}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      loader={loader}
      dialogs={dialogs}
      currentPartner={currentPartner}
      dateToNow={dateToNow}
    />
  );
};

export default connect(
  ({ dialogs, messages, auth }) => ({
    currentPartner: dialogs.dialogs.find((dialog) => dialog.dialogId === dialogs.currentDialogId),
    dialogs: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    loader: messages.loader,
    user: auth.user.id,
  }),
  { ...messagesActions },
)(Messages);
