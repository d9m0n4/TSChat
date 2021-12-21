import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import Dialogs from '../Services/Dialogs';
import User from '../Services/Users';
import { connect } from 'react-redux';

import dialogActions from '../store/actions/dialogActions';
import socket from '../core/socket';

const LeftBar = ({ fetchDialogs, items, currentDialogId }) => {
  const [visible, setVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [users, setUsers] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (value = '') => {
    // setFiltredDialogs(
    //   dialogItems.filter(
    //     (dialog) => dialog.partner.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
    //   ),
    // );
    setInputValue(value);
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onSearch = async (value) => {
    await User.findUsers(value)
      .then((data) => {
        setUsers(data);
        console.log('Users from find', data);
      })
      .catch((err) => console.log(err));
  };

  const onSelect = (value) => {
    setSelectedUserId(value.value);
  };

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const onSendMessage = () => {
    Dialogs.createDialog({
      partner: selectedUserId,
      text: messageValue,
    });
    hideModal();
  };

  useEffect(() => {
    fetchDialogs();
    socket.on('DIALOG:CREATED', fetchDialogs);
  }, [fetchDialogs, currentDialogId]);

  return (
    <Leftbar
      inputValue={inputValue}
      onChangeInput={onChangeInput}
      dialogs={items}
      messageValue={messageValue}
      onSendMessage={onSendMessage}
      onChangeValue={onChangeValue}
      users={users}
      onSearch={onSearch}
      onSelect={onSelect}
      selectedUserId={selectedUserId}
      visible={visible}
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default connect(
  ({ dialogs }) => ({ items: dialogs.dialogs, currentDialogId: dialogs.currentDialogId }),
  { ...dialogActions },
)(LeftBar);
