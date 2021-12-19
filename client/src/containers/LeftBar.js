import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import Dialogs from '../Services/Dialogs';
import User from '../Services/Users';

import store from '../store';
import dialogActions from '../store/actions/dialogActions';

const LeftBar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [users, setUsers] = useState([]);
  const [messageValue, setMessageValue] = useState('');

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
  };

  useEffect(() => {}, []);
  store.dispatch(dialogActions.fetchDialogs());
  return (
    <Leftbar
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

export default LeftBar;
