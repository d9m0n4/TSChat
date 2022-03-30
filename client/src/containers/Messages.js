import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMessages from '../components/ChatMessages';
import socket from '../api/socket';
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
  updateReadStatus,
}) => {
  const scrollRef = useRef(null);
  const anchor = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();

  const newMessage = (data) => {
    addMessage(data);
  };

  const scrollToBottom = () => scrollRef.current.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(scrollToBottom(), 500);
    }
  }, [items, isTyping, currentDialogId]);

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

  useEffect(() => {
    socket.on('TYPING', (o) => {
      if (!o) {
        setIsTyping(false);
        setTypingUser(null);
      } else {
        setIsTyping(true);
        setTypingUser(o.user);
      }
    });
    return () => {
      socket.removeListener('TYPING');
    };
  }, [isTyping]);

  useEffect(() => {
    socket.on('SERVER:UPDATE_READSTATUS', updateReadStatus);

    return () => {
      socket.removeListener('SERVER:UPDATE_READSTATUS');
    };
  }, [items, currentDialogId, updateReadStatus]);

  useEffect(() => {
    if (anchor) {
      console.log(anchor.current.getBoundingClientRect());
    }
  });

  return (
    <ChatMessages
      isTyping={isTyping}
      user={user}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      currentConvId={currentConvId}
      loader={loader}
      dialogs={dialogs}
      currentPartner={currentPartner && currentPartner}
      currentConv={currentConv}
      typingUser={typingUser}
      anchor={anchor}
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
