import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import Dialogs from '../Services/Dialogs';
import User from '../Services/Users';
import { useSelector } from 'react-redux';

import socket from '../api/socket';
import { withRouter } from 'react-router';
import Conversations from '../Services/Conversations';
import dialogActions from '../store/actions/dialogActions';
import conversationsActions from '../store/actions/conversatiosActions';
import messagesActions from '../store/actions/messagesActions';
import { CONVERSATION_PATH, DIALOG_PATH } from '../constants';
import { conversations, dialogs, auth } from '../store/selectors';
import { useActions } from '../hooks/useActions';

const LeftBarContainer = ({ history }) => {
  const { items: currentConversations, currentConvId } = useSelector(conversations);
  const { currentDialogId, isLoading, dialogs: items } = useSelector(dialogs);
  const { user } = useSelector(auth);

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

  const { fetchDialogs } = useActions(dialogActions);
  const { updateMessages, updateReadStatus } = useActions(messagesActions);
  const { fetchConversations } = useActions(conversationsActions);

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
    socket.on('CONVERSATION_SET_ITEM', (data) => {
      history.push(`/im/${CONVERSATION_PATH}/${data._id}`);
    });

    return () => {
      socket.removeListener('CONVERSATION_SET_ITEM');
    };
  };

  const onSelect = (value) => {
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
      history.push(`/im/${DIALOG_PATH}/${data._id}`);
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
      socket.removeListener('SERVER:DIALOG_CHANGED');
    };
  }, [fetchDialogs, updateMessages]);

  useEffect(() => {
    fetchConversations();
    socket.on('CONVERSATION_SET_ITEM', fetchConversations);
    socket.on('SERVER:CONV_CHANGED', fetchConversations);

    return () => {
      socket.removeListener('CONVERSATION_SET_ITEM');
      socket.removeListener('SERVER:CONV_CHANGED');
    };
  }, [fetchConversations]);

  useEffect(() => {
    socket.on('SERVER:UPDATE_READSTATUS', updateReadStatus);
    return () => {
      socket.removeListener('SERVER:UPDATE_READSTATUS');
    };
  }, [currentDialogId, updateReadStatus, items]);

  useEffect(() => {
    socket.emit('DIALOGS:JOIN', { dialogId: currentDialogId || currentConvId });
    if (!currentDialogId) {
      socket.emit('LEAVE_ROOM', { dialogId: currentDialogId });
    }
    if (!currentConvId) {
      socket.emit('LEAVE_ROOM', { dialogId: currentConvId });
    }
    return () => {
      socket.emit('LEAVE_ROOM', { dialogId: currentDialogId || currentConvId });
      socket.removeListener('DIALOGS:JOIN');

      socket.removeListener('LEAVE_ROOM');
    };
  }, [currentDialogId, currentConvId]);

  return (
    <Leftbar
      handleChangeSelect={handleChangeSelect}
      conversations={currentConversations}
      convUsers={convUsers}
      userId={user && user.id}
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

export default withRouter(LeftBarContainer);
