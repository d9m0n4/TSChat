import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';
import fetchUser from '../Services/Users';

const LeftBar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [dialog, setDialog] = useState();

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const onSearch = (value) => {
    const data = fetchUser(value);
    console.log(data);
  };

  const onSelect = (value) => {
    setSelectedUserId(value);
  };

  useEffect(() => {
    setDialog(selectedUserId);
  }, [selectedUserId, dialog]);
  return (
    <Leftbar
      onSearch={onSearch}
      dialog={dialog}
      onSelect={onSelect}
      selectedUserId={selectedUserId}
      visible={visible}
      showModal={showModal}
      hideModal={hideModal}
    />
  );
};

export default LeftBar;
