import React, { useCallback, useEffect, useState } from 'react';
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
  const [dialogPartners, setDialogPartners] = useState([]);
  const [filtred, setFiltredDialogs] = useState(Array.from(dialogPartners));

  const onChangeInput = (e) => {
    const value = e.target.value;

    setFiltredDialogs(
      dialogPartners &&
        dialogPartners.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0),
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
  };

  useEffect(() => {
    const partners = [];

    items.forEach((item) => {
      const data = item.members.find((m) => m._id !== userId);
      partners.push({ dialogId: item._id, ...data });
      setDialogPartners(partners);
    });
  }, [items, userId]);

  useEffect(() => {
    setFiltredDialogs(dialogPartners);
  }, [dialogPartners]);

  const fDialogs = useCallback(fetchDialogs, [fetchDialogs]);

  useEffect(() => {
    fDialogs();
    socket.on('DIALOG:CREATED', fDialogs);

    return () => {
      socket.removeListener('DIALOG:CREATED', fDialogs);
    };
  }, [fDialogs, currentDialogId]);

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
