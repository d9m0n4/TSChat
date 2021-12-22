import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ChatMesaages from '../components/ChatMessages';
import messagesActions from '../store/actions/messagesActions';

const Messages = ({ fetchMessages, currentDialogId, items, user, dialogs }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [items]);

  useEffect(() => {
    if (currentDialogId) {
      fetchMessages(currentDialogId);
    }
  }, [fetchMessages, currentDialogId]);

  return <ChatMesaages user={user} messages={items} scrollRef={scrollRef} />;
};

export default connect(
  ({ dialogs, messages, auth }) => ({
    dialogs: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    user: auth.user.id,
  }),
  { ...messagesActions },
)(Messages);
