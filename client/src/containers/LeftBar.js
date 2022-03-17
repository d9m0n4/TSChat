import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import Dialogs from '../Services/Dialogs';
import User from '../Services/Users';
import { connect, useSelector } from 'react-redux';

import dialogActions from '../store/actions/dialogActions';
import socket from '../api/socket';
import { withRouter } from 'react-router';
import Conversations from '../Services/Conversations';
import conversationsActions from '../store/actions/conversatiosActions';

const LeftBarContainer = ({
  fetchDialogs,
  isLoading,
  items,
  userId,
  history,
  fetchConversations,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [convVisible, setConvVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [convTitle, setConvTitle] = useState(null);
  const [users, setUsers] = useState([]);
  const [convUsers, setConvUsers] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filtered, setFilteredDialogs] = useState(items && Array.from(items));

  const { items: conversations } = useSelector((state) => state.conversations);

  const onChangeConvTitle = (e) => {
    setConvTitle(e.target.value);
  };

  const onChangeInput = (e) => {
    const value = e.target.value;

    setFilteredDialogs(
      items &&
        items.filter((item) => item.partner.name.toLowerCase().indexOf(value.toLowerCase()) >= 0),
    );
    setInputValue(value);
  };

  const showDialogModal = () => {
    setDialogVisible(true);
  };

  const hideDialogModal = () => {
    setUsers([]);
    setInputValue('');
    setSelectedUserId(null);
    setDialogVisible(false);
  };

  const onShowConvModal = () => {
    setConvVisible(true);
  };

  const onHideConvModal = () => {
    setConvVisible(false);
    setUsers([]);
    setConvTitle('');
  };

  const onSearch = async (value) => {
    await User.findUsers(value)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeSelect = (v) => {
    const a = [];
    for (let i = 0; i < v.length; i++) {
      a.push(v[i].value);
    }
    setConvUsers(a);
  };

  const onCreateConv = () => {
    if (!convUsers.length) {
      return console.log('выберите собеседника');
    }
    Conversations.createConversation({ title: convTitle, members: convUsers });
    onHideConvModal();
  };

  const onSelect = (value) => {
    console.log(value);
    setSelectedUserId(value.value);
  };

  const onChangeValue = (e) => {
    setMessageValue(e.target.value);
  };

  const onSendMessage = () => {
    setUploading(true);
    Dialogs.createDialog({
      partner: selectedUserId,
      text: messageValue,
    });
    socket.on('DIALOG:CREATED', (data) => {
      history.push(data._id);
    });
    setUploading(false);
    hideDialogModal();

    return () => {
      socket.removeListener('DIALOG:CREATED');
    };
  };

  useEffect(() => {
    setFilteredDialogs(items);
  }, [items]);

  useEffect(() => {
    fetchDialogs();
    socket.on('DIALOG:CREATED', fetchDialogs);
    socket.on('SERVER:DIALOG_CHANGED', fetchDialogs);

    return () => {
      socket.removeListener('DIALOG:CREATED');
      socket.removeListener('status');
      socket.removeListener('SERVER:DIALOG_CHANGED');
    };
  }, [fetchDialogs]);

  useEffect(() => {
    fetchConversations();
    socket.on('CONVERSATION_SET_ITEM', fetchConversations);
    socket.on('SERVER:CONV_CHANGED', fetchConversations);

    return () => {
      socket.removeListener('CONVERSATION_SET_ITEM');
      socket.removeListener('SERVER:CONV_CHANGED');
    };
  }, [fetchConversations]);

  // socket.on('status', (d) => console.log(d));

  return (
    <Leftbar
      handleChangeSelect={handleChangeSelect}
      conversations={conversations}
      convUsers={convUsers}
      userId={userId}
      isLoading={isLoading}
      uploading={uploading}
      inputValue={inputValue}
      dialogs={filtered}
      messageValue={messageValue}
      visible={dialogVisible}
      convVisible={convVisible}
      convTitle={convTitle}
      users={users}
      selectedUserId={selectedUserId}
      onSendMessage={onSendMessage}
      onChangeValue={onChangeValue}
      onChangeInput={onChangeInput}
      onCreateConv={onCreateConv}
      onSearch={onSearch}
      onSelect={onSelect}
      setConvTitle={onChangeConvTitle}
      showModal={showDialogModal}
      hideModal={hideDialogModal}
      showConvModal={onShowConvModal}
      hideConvModal={onHideConvModal}
    />
  );
};

export default withRouter(
  connect(
    ({ dialogs, auth }) => ({
      items: dialogs.dialogs,
      currentDialogId: dialogs.currentDialogId,
      userId: auth.user && auth.user.id,
      isLoading: dialogs.isLoading,
    }),
    { ...dialogActions, ...conversationsActions },
  )(LeftBarContainer),
);
