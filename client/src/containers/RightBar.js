import React from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Rightbar from '../components/RightBar';
import Files from '../Services/Files';

import filesActions from '../store/actions/filesActions';

const RightBarContianer = () => {
  const dispatch = useDispatch();
  const { currentDialogId, currentPartner } = useSelector((state) => state.dialogs, shallowEqual);
  const { files } = useSelector((state) => state.files, shallowEqual);

  useEffect(() => {
    if (currentPartner) {
      dispatch(filesActions.getFiles(currentPartner.partner._id));
    }
  }, [currentPartner]);

  return (
    <Rightbar currentDialogId={currentDialogId} partner={currentPartner} attachments={files} />
  );
};

export default RightBarContianer;
