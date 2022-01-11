import React from 'react';
import { connect } from 'react-redux';
import dialogActions from '../store/actions/dialogActions';
import Rightbar from '../components/RightBar';

const RightBarContianer = ({ items, currentDialogId, currentPartner }) => {
  return <Rightbar currentDialogId={currentDialogId} partner={currentPartner} />;
};

export default connect(
  ({ dialogs }) => ({
    currentPartner: dialogs.dialogs.find((dialog) => dialog.dialogId === dialogs.currentDialogId),
    items: dialogs.dialogs,
    currentDialogId: dialogs.currentDialogId,
  }),
  { ...dialogActions },
)(RightBarContianer);
