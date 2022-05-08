import React, { useEffect, useRef, useState } from 'react';
import UserProfile from '../Pages/Profile/UserProfile';
import socket from '../api/socket';

import authActions from '../store/actions/authActions';
import Messages from '../Services/Messages';
import { useDispatch, useSelector } from 'react-redux';
import getBase64 from '../helpers/getBase64';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const [url, setUrl] = useState(user && user.avatar);
  const [fileList, setFileList] = useState(url);
  const [userFiles, setUserFiles] = useState();

  const [isPlaying, setIsPlaying] = useState(false);

  const [date, setDate] = useState(null);

  const openModal = () => {
    setVisible(true);
  };

  const handleChangeAvatar = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl) => setUrl(imageUrl));
    }
    setFileList([info.file.originFileObj]);
  };

  useEffect(() => {
    socket.on('getCurrentUser', () => {
      dispatch(authActions.getCurrentUser());
    });
    return () => {
      socket.removeListener('getCurrentUser');
    };
  }, [dispatch]);

  useEffect(() => {
    const get = async (id) => {
      const result = [];
      await Messages.getMessagesOfUser(id).then((files) => {
        if (files.data) {
          files.data.forEach((item) => {
            result.push(...Object.values(item.attachments));
          });
        }
      });
      setUserFiles(result);
    };
    if (user) {
      get(user.id);
    }
  }, [user]);

  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (audioRef.current !== null) {
      audioRef.current.addEventListener(
        'playing',
        () => {
          console.log('playing');
          setIsPlaying(true);
        },
        false,
      );
      audioRef.current.addEventListener(
        'pause',
        () => {
          console.log('pause');
          setIsPlaying(false);
        },
        false,
      );
      audioRef.current.addEventListener('ended', (e) => {
        console.log('end');
        setIsPlaying(false);
      });
    }
  }, []);

  const onChange = (date, dateString) => {
    setDate(date);
  };
  return (
    <UserProfile
      setVisible={setVisible}
      visible={visible}
      user={user}
      openModal={openModal}
      userFiles={userFiles}
      audioRef={audioRef}
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      fileList={fileList}
      date={date}
      handleChangeAvatar={handleChangeAvatar}
      url={url}
      onChange={onChange}
    />
  );
}

export default Profile;
