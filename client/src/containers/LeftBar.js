import React, { useEffect, useState } from 'react';
import Leftbar from '../components/LeftBar';

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

  const onSearch = () => {};

  const onSelect = (value) => {
    setSelectedUserId(value);
  };

  useEffect(() => {
    setDialog(selectedUserId);
    console.log(dialog);
  }, [selectedUserId, dialog]);
  return (
    <Leftbar
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
