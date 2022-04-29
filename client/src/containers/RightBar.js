import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  dialogs,
  conversations,
  files,
  user,
  currentConversation,
  isShown,
} from '../store/selectors';
import { useActions } from '../hooks/useActions';

import filesActions from '../store/actions/filesActions';
import dialogActions from '../store/actions/dialogActions';

import Rightbar from '../components/RightBar';
import Users from '../Services/Users';
import Conversations from '../Services/Conversations';

const RightBarContianer = () => {
  const { getFiles } = useActions(filesActions);
  const { setCurrentPartner } = useActions(dialogActions);

  const { currentDialogId, currentPartner, dialogs: currentDialogs } = useSelector(dialogs);
  const { currentConvId, currentConversation: currentConv, items } = useSelector(conversations);
  const { id: currentUserId } = useSelector(user);
  const convMembers = useSelector(currentConversation);
  const { files: filesItems } = useSelector(files);
  const { active } = useSelector(isShown);

  const [users, setUsers] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const [convUsers, setConvUsers] = useState();

  const showModal = () => {
    setVisibleModal(true);
  };

  const hideModal = () => {
    setVisibleModal(false);
    setUsers(null);
  };

  const onSearch = async (value) => {
    console.log(value, convMembers.members);
    const members = convMembers.members.map((item) => item.id);
    await Users.updateConvUsers({ value, members })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChangeSelect = (v) => {
    console.log(v);
    const a = [];
    for (let i = 0; i < v.length; i++) {
      a.push(v[i].value);
    }
    setConvUsers(a);
  };

  const updateConversation = () => {
    Conversations.updateConversation({ id: currentConvId, users: convUsers });
    hideModal();
  };

  useEffect(() => {
    if (currentPartner && currentDialogId) {
      getFiles(currentDialogId);
    }
  }, [
    users,
    currentDialogId,
    currentPartner,
    getFiles,
    setCurrentPartner,
    currentDialogs,
    currentConvId,
    items,
  ]);

  return (
    <Rightbar
      conversation={currentConv}
      currentConvId={currentConvId}
      currentDialogId={currentDialogId}
      partner={currentPartner}
      attachments={filesItems}
      currentUserId={currentUserId}
      convUsers={users}
      showModal={showModal}
      hideModal={hideModal}
      visibleModal={visibleModal}
      onSearch={onSearch}
      handleChangeSelect={handleChangeSelect}
      updateConversation={updateConversation}
      isShown={active}
    />
  );
};

export default RightBarContianer;
