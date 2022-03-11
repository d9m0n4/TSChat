import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMessages from '../components/ChatMessages';
import socket from '../core/socket';
import messagesActions from '../store/actions/messagesActions';

const Messages = ({
  getMessages,
  currentDialogId,
  currentPartner,
  items,
  user,
  dialogs,
  loader,
  addMessage,
  currentConv,
  currentConvId,
}) => {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current && scrollRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [items]);

  const newMessage = (data) => {
    console.log(data);
    addMessage(data);
  };

  useEffect(() => {
    if (currentDialogId || currentConvId) {
      getMessages(currentDialogId || currentConvId);
      socket.on('SERVER:CREATE_MESSAGE', newMessage);
    }
    return () => {
      socket.removeListener('SERVER:CREATE_MESSAGE');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialogId, getMessages, currentConvId]);

  return (
    <ChatMessages
      user={user}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      currentConvId={currentConvId}
      loader={loader}
      dialogs={dialogs}
      currentPartner={currentPartner && currentPartner}
      currentConv={currentConv}
    />
  );
};

export default connect(
  ({ dialogs, messages, auth, conversations }) => ({
    currentConvId: conversations.currentConvId,
    currentConv:
      conversations && conversations.items.find((item) => item.id === conversations.currentConvId),
    dialogs: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
    currentPartner: dialogs.currentPartner,
    items: messages.items,
    loader: messages.loader,
    user: auth.user && auth.user.id,
  }),
  { ...messagesActions },
)(Messages);
