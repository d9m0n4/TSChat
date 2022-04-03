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
  getMessagesHistory,
}) => {
  const scrollRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();
  const [offset, setOffset] = useState(10);
  const [messagesCount, setMessagesCount] = useState(0);

  const newMessage = (data) => {
    addMessage(data);
  };

  const scrollToBottom = (to) =>
    scrollRef.current.scrollBy({
      top: to,
      behavior: 'smooth',
    });

  useEffect(() => {
    if (scrollRef.current) {
      scrollToBottom(scrollRef.current.getBoundingClientRect().bottom);
      if (isTyping) {
        scrollRef.current.addEventListener('scroll', (e) => {
          e.preventDefault();
        });
      }
    }
  }, [isTyping, currentDialogId]);

  useEffect(() => {
    setOffset(Array.from(items).length);
  }, [items]);

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
    socket.on('MESSAGES_GET_COUNT', setMessagesCount);
    return () => {
      socket.removeListener('MESSAGES_GET_COUNT');
    };
  }, [messagesCount]);

  const scrollHandler = (e) => {
    if (e.target.scrollTop === 0 && messagesCount > offset) {
      setTimeout(() => {
        getMessagesHistory(currentDialogId || currentConvId, offset);
      });
    }
  };

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
      scrollHandler={scrollHandler}
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
