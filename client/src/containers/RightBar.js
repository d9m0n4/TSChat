import React, {useState} from 'react';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Rightbar from '../components/RightBar';

import filesActions from '../store/actions/filesActions';

const RightBarContianer = () => {
  const [currentConv, setCurrentConv] = useState()
  const dispatch = useDispatch();
  const { currentDialogId, currentPartner } = useSelector((state) => state.dialogs, shallowEqual);
  const { currentConvId, items: conversations } = useSelector(
    (state) => state.conversations,
    shallowEqual,
  );
  const { files } = useSelector((state) => state.files, shallowEqual);

  useEffect(() => {
    if (currentPartner && currentDialogId) {
      dispatch(filesActions.getFiles(currentDialogId));
    }
  }, [currentDialogId, currentPartner, dispatch]);

  useEffect(() => {

       setCurrentConv( conversations.find(item => item.id === currentConvId))

  }, [])

  return (
    <Rightbar
      conversation={currentConv}
      currentConvId={currentConvId}
      currentDialogId={currentDialogId}
      partner={currentPartner}
      attachments={files}
    />
  );
};

export default RightBarContianer;
