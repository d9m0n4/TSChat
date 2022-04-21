import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dialogs, conversations, files } from '../store/selectors';
import { useActions } from '../hooks/useActions';

import filesActions from '../store/actions/filesActions';

import Rightbar from '../components/RightBar';

const RightBarContianer = () => {
  const { getFiles } = useActions(filesActions);

  const { currentDialogId, currentPartner } = useSelector(dialogs);
  const { currentConvId, currentConversation: currentConv } = useSelector(conversations);
  const { files: filesItems } = useSelector(files);

  useEffect(() => {
    if (currentPartner && currentDialogId) {
      getFiles(currentDialogId);
    }
    console.log(currentPartner);
  }, [currentDialogId, currentPartner, getFiles]);

  return (
    <Rightbar
      conversation={currentConv}
      currentConvId={currentConvId}
      currentDialogId={currentDialogId}
      partner={currentPartner}
      attachments={filesItems}
    />
  );
};

export default RightBarContianer;
