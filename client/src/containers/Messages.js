import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import { dialogs, messages, user, conversations, isShown } from '../store/selectors';
import ChatMessages from '../components/Layout/ChatMessages';
import messagesActions from '../store/actions/messagesActions';
import socket from '../api/socket';
import dialogActions from '../store/actions/dialogActions';
import conversationsActions from '../store/actions/conversatiosActions';
import rightBarActions from '../store/actions/rightbar';

const Messages = () => {
  const scrollBlock = useRef(null);
  const messageRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();
  const [offset, setOffset] = useState(10);
  const [messagesCount, setMessagesCount] = useState(0);
  const [scrollBtnActive, setScrollBtnActive] = useState(false);

  const { dialogs: dialogsItems, currentDialogId, currentPartner } = useSelector(dialogs);
  const { items, loader } = useSelector(messages);
  const { id } = useSelector(user);
  const { active } = useSelector(isShown);
  const { currentConvId, currentConversation: currentConv } = useSelector(conversations);

  const { getMessages, getMessagesHistory, addMessage } = useActions(messagesActions);
  const { updateDialogUnreadMessagesCount } = useActions(dialogActions);
  const { updateConvUnreadMessagesCount } = useActions(conversationsActions);
  const { setIsShown } = useActions(rightBarActions);

  const setShown = () => {
    return setIsShown(!active);
  };

  const newMessage = (data) => {
    addMessage(data);
  };

  const getData = () => {
    return getMessagesHistory(currentDialogId || currentConvId, offset);
  };

  const showScrollButton = (e) => {
    const scrollPosition = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) * 100,
    );
    scrollPosition < -30 ? setScrollBtnActive(true) : setScrollBtnActive(false);
  };

  const scrollToBottom = () => {
    scrollBlock.current.scrollBy({
      top: scrollBlock.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setOffset(Array.from(items).length);
  }, [items]);

  useEffect(() => {
    if (currentDialogId || currentConvId) {
      getMessages(currentDialogId || currentConvId);
      socket.on('SERVER:CREATE_MESSAGE', newMessage);
      updateDialogUnreadMessagesCount({ id: currentDialogId, user: user.id });
      updateConvUnreadMessagesCount({ id: currentConvId, user: user.id });
    }
    return () => {
      socket.removeListener('SERVER:CREATE_MESSAGE');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialogId, getMessages, currentConvId]);

  useEffect(() => {
    socket.on('MESSAGES_GET_COUNT', setMessagesCount);
    return () => {
      socket.removeListener('MESSAGES_GET_COUNT');
    };
  }, [messagesCount]);

  useEffect(() => {
    socket.on('USER_TYPING', ({ dialogId, isTyping, user }) => {
      if (dialogId === (currentConvId || currentDialogId)) {
        setIsTyping(isTyping);
        setTypingUser(user);
      }
    });

    return () => {
      socket.removeListener('USER_TYPING');
      setIsTyping(false);
    };
  }, [currentConvId, currentDialogId]);

  return (
    <ChatMessages
      isTyping={isTyping}
      user={id}
      messages={items}
      currentDialogId={currentDialogId}
      currentConvId={currentConvId}
      loader={loader}
      dialogs={dialogsItems}
      currentPartner={currentPartner}
      currentConv={currentConv}
      typingUser={typingUser}
      offset={offset}
      getMessagesHistory={getMessagesHistory}
      messagesCount={messagesCount}
      getData={getData}
      showScrollButton={showScrollButton}
      scrollBtnActive={scrollBtnActive}
      scrollToBottom={scrollToBottom}
      scrollBlock={scrollBlock}
      setShown={setShown}
      rightBarActive={active}
      messageRef={messageRef}
    />
  );
};

export default Messages;
