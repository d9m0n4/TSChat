import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import dialogActions from '../store/actions/dialogActions';
import Rightbar from '../components/RightBar';

const RightBarContianer = ({ items, currentDialogId }) => {
  const [currentDialog, setCurrentDialog] = useState({});

  useEffect(() => {
    const data = Object.values(items.filter((item) => item._id === currentDialogId));

    for (const key in data) {
      const element = data[key];
      setCurrentDialog(element.partner);
    }
  }, [currentDialogId, items]);

  return <Rightbar currentDialogId={currentDialogId} partner={currentDialog} />;
};

export default connect(
  ({ dialogs }) => ({
    items: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
  }),
  { ...dialogActions },
)(RightBarContianer);
