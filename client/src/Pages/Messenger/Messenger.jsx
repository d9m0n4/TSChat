import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { CONVERSATION_PATH, DIALOG_PATH } from '../../constants';
import LeftBar from '../../containers/LeftBar';
import Messages from '../../containers/Messages';
import RightBarContainer from '../../containers/RightBar';
import { useActions } from '../../hooks/useActions';
import conversationsActions from '../../store/actions/conversatiosActions';
import dialogActions from '../../store/actions/dialogActions';
import { conversations, dialogs } from '../../store/selectors';

const Messenger = () => {
  const { id } = useParams();
  let { pathname } = useLocation();

  const { id: currentId } = useParams();

  const { setCurrentDialogId, setCurrentPartner } = useActions(dialogActions);
  const { setCurrentConversationId, setCurrentConversation } = useActions(conversationsActions);

  const { items: convs } = useSelector(conversations);
  const { dialogs: dialogsItems } = useSelector(dialogs);

  useEffect(() => {
    if (id) {
      if (pathname.includes(DIALOG_PATH)) {
        setCurrentConversation(null);
        setCurrentConversationId(null);
        for (const dialog of dialogsItems) {
          if (dialog.dialogId === currentId) {
            setCurrentDialogId(currentId);
            setCurrentPartner(dialog.partner);
          }
        }
      }
      if (pathname.includes(CONVERSATION_PATH)) {
        setCurrentDialogId(null);
        setCurrentPartner(null);
        setCurrentConversationId(null);
        setCurrentConversation(null);
        for (const conversation of convs) {
          if (conversation.id === id) {
            setCurrentConversationId(id);
            setCurrentConversation(conversation);
          }
        }
      }
    } else {
      setCurrentPartner(null);
      setCurrentDialogId(null);
      setCurrentConversation(null);
      setCurrentConversationId(null);
    }
  }, [
    currentId,
    setCurrentDialogId,
    setCurrentPartner,
    dialogsItems,
    id,
    setCurrentConversation,
    setCurrentConversationId,
    convs,
    pathname,
  ]);
  return (
    <>
      <div className="main__content">
        <div className="main__content-body">
          <LeftBar />
          <Messages />
          <RightBarContainer />
        </div>
      </div>
    </>
  );
};

export default Messenger;
