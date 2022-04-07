import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dialogs, conversations, files } from '../store/selectors';
import { useActions } from '../hooks/useActions';

import filesActions from '../store/actions/filesActions';

import Rightbar from '../components/RightBar';

const RightBarContianer = () => {
  const [currentConv, setCurrentConv] = useState();

  const { getFiles } = useActions(filesActions);

  const { currentDialogId, currentPartner } = useSelector(dialogs);
  const { currentConvId, items: convItems } = useSelector(conversations);
  const { files: filesItems } = useSelector(files);

  useEffect(() => {
    if (currentPartner && currentDialogId) {
      getFiles(currentDialogId);
    }
  }, [currentDialogId, currentPartner, getFiles]);

  useEffect(() => {
    if (currentConvId) {
      const currentConv = convItems.find((item) => item.id === currentConvId);
      setCurrentConv(currentConv);
    }
  }, [currentConvId, convItems]);

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
