import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dialogs, conversations, files, user, currentConversation } from '../store/selectors';
import { useActions } from '../hooks/useActions';

import filesActions from '../store/actions/filesActions';
import dialogActions from '../store/actions/dialogActions';

import Rightbar from '../components/RightBar';
import Users from '../Services/Users';

const RightBarContianer = () => {
  const { getFiles } = useActions(filesActions);
  const { setCurrentPartner } = useActions(dialogActions);

  const { currentDialogId, currentPartner, dialogs: currentDialogs } = useSelector(dialogs);
  const { currentConvId, currentConversation: currentConv, items } = useSelector(conversations);
  const { id: currentUserId } = useSelector(user);
  const convMembers = useSelector(currentConversation);
  const { files: filesItems } = useSelector(files);

  const [users, setUsers] = useState();
  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = () => {
    setVisibleModal(true);
  };

  const hideModal = () => {
    setVisibleModal(false);
  };

  const onSearch = async (value) => {
    console.log(value, convMembers.members);
    const members = convMembers.members.map((item) => item.id);
    await Users.updateConvUsers({ value, members }).then(({ data }) => {
      setUsers(data);
    });
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
    />
  );
};

export default RightBarContianer;
