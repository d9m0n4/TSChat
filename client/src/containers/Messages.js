import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ChatMesaages from '../components/ChatMessages';
import messagesActions from '../store/actions/messagesActions';

const Messages = ({ fetchMessages, currentDialogId, items, user, dialogs }) => {
  const [currentPartner, setCurrentPartner] = useState();
  const scrollRef = useRef();
  // useEffect(() => {
  //   scrollRef.current.scrollIntoView({ behaivor: 'smooth' });
  // }, []);

  // useEffect(() => {
  //   fetchMessages(currentDialogId);
  // }, [currentDialogId]);

  return (
    <ChatMesaages
      currentPartner={currentPartner}
      user={user}
      messages={items}
      scrollRef={scrollRef}
    />
  );
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
