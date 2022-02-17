import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMessages from '../components/ChatMessages';
import socket from '../core/socket';
import messagesActions from '../store/actions/messagesActions';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialogId, fetchMessages]);

  return (
    <ChatMessages
      user={user}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      loader={loader}
      dialogs={dialogs}
      currentPartner={currentPartner && currentPartner}
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
    user: auth.user && auth.user.id,
  }),
  { ...messagesActions },
)(Messages);
