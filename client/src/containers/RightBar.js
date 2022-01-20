import React from 'react';
import { connect } from 'react-redux';
import dialogActions from '../store/actions/dialogActions';
import Rightbar from '../components/RightBar';

const RightBarContianer = ({ currentDialogId, partner }) => {
  return <Rightbar currentDialogId={currentDialogId} partner={partner} />;
};

export default connect(
  ({ dialogs }) => ({
    partner: dialogs.currentPartner,
    currentDialogId: dialogs.currentDialogId,
  }),
  { ...dialogActions },
)(RightBarContianer);
