import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dialogs, conversations, files } from '../store/selectors';
import { useActions } from '../hooks/useActions';

import filesActions from '../store/actions/filesActions';
import dialogActions from '../store/actions/dialogActions';
import conversatioActions from '../store/actions/conversatiosActions';

import Rightbar from '../components/RightBar';

const RightBarContianer = () => {
  const { getFiles } = useActions(filesActions);
  const { setCurrentPartner } = useActions(dialogActions);
  const { setCurrentConv } = useActions(conversatioActions);

  const { currentDialogId, currentPartner, dialogs: currentDialogs } = useSelector(dialogs);
  const { currentConvId, currentConversation: currentConv, items } = useSelector(conversations);
  const { files: filesItems } = useSelector(files);

  useEffect(() => {
    if (currentPartner && currentDialogId) {
      getFiles(currentDialogId);
    }
  }, [
    currentDialogId,
    currentPartner,
    getFiles,
    setCurrentPartner,
    currentDialogs,
    currentConvId,
    items,
  ]);

  return (
    <Rightbar
      conversation={currentConv && currentConv.members}
      currentConvId={currentConvId}
      currentDialogId={currentDialogId}
      partner={currentPartner}
      attachments={filesItems}
    />
  );
};

export default RightBarContianer;
