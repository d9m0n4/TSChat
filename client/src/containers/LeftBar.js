import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import Dialogs from '../Services/Dialogs';
import User from '../Services/Users';
import { connect } from 'react-redux';

import dialogActions from '../store/actions/dialogActions';
import socket from '../core/socket';
import { withRouter } from 'react-router';

const LeftBar = ({ fetchDialogs, items, currentDialogId, userId, history }) => {
  const [visible, setVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [users, setUsers] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [filtred, setFiltredDialogs] = useState(Array.from(items));

  const onChangeInput = (e) => {
    const value = e.target.value;

    setFiltredDialogs(
      items &&
        items.filter((item) => item.partner.name.toLowerCase().indexOf(value.toLowerCase()) >= 0),
    );
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
    socket.on('DIALOG:CREATED', (data) => {
      history.push(data._id);
    });
    hideModal();

    return () => {
      socket.removeListener('DIALOG:CREATED');
    };
  };

  useEffect(() => {
    setFiltredDialogs(items);
  }, [items]);

  useEffect(() => {
    fetchDialogs();
    socket.on('DIALOG:CREATED', fetchDialogs);
    socket.on('SERVER:DIALOG_CHANGED', fetchDialogs);

    console.log('Диалог обновлен');

    return () => {
      socket.removeListener('DIALOG:CREATED');
      socket.removeListener('status');
      socket.removeListener('SERVER:DIALOG_CHANGED');
    };
  }, [fetchDialogs]);

  socket.on('statuss', (d) => console.log(d));

  return (
    <Leftbar
      inputValue={inputValue}
      onChangeInput={onChangeInput}
      dialogs={filtred}
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
      userId={userId}
    />
  );
};

export default withRouter(
  connect(
    ({ dialogs, auth }) => ({
      items: dialogs.dialogs,
      currentDialogId: dialogs.currentDialogId,
      userId: auth.user.id,
    }),
    { ...dialogActions },
  )(LeftBar),
);
