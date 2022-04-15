import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { dialogs, messages, user, conversations } from '../store/selectors';
import ChatMessages from '../components/ChatMessages';
import messagesActions from '../store/actions/messagesActions';
import socket from '../api/socket';

const Messages = () => {
  const scrollRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();
  const [offset, setOffset] = useState(10);
  const [messagesCount, setMessagesCount] = useState(0);

  const { dialogs: dialogsItems, currentDialogId, currentPartner } = useSelector(dialogs);
  const { items, loader } = useSelector(messages);
  const { id } = useSelector(user);
  const { currentConvId, currentConversation: currentConv } = useSelector(conversations);

  const { getMessages, getMessagesHistory, addMessage, updateReadStatus } =
    useActions(messagesActions);

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

    if (scrollRef.current) {
      console.log(scrollRef.current.getBoundingClientRect());
    }
  }, [isTyping, currentDialogId, currentConvId, items]);

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
      user={id}
      messages={items}
      scrollRef={scrollRef}
      currentDialogId={currentDialogId}
      currentConvId={currentConvId}
      loader={loader}
      dialogs={dialogsItems}
      currentPartner={currentPartner && currentPartner}
      currentConv={currentConv}
      typingUser={typingUser}
      scrollHandler={scrollHandler}
    />
  );
};

export default Messages;
