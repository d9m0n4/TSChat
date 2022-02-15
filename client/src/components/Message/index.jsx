import { Button, Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Emoji, getEmojiDataFromNative } from 'emoji-mart';
import { EyeOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';
import data from 'emoji-mart/data/all.json';
import './index.scss';

import UserAvatar from '../Avatar';
import toDate from '../../helpers/ToDate';
import toCurrentTime from '../../helpers/toCurrentTime';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Message = ({ isMe, name, text, date, attachments, user }) => {
  console.log(user);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (audioRef.current !== null) {
      audioRef.current.addEventListener('canplay', (e) => {
        // console.log(e.target.duration);
        // if (e.target.duration === Infinity) {
        //   console.log(e.target.duration, e.target);
        // }
      });
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
        setDuration(0);
        setCurrentTime(e.target.currentTime);
      });

      audioRef.current.addEventListener('timeupdate', (e) => {
        const duration = Math.floor((e.target.currentTime / e.target.duration) * 100);
        setDuration(duration);
        setCurrentTime(e.target.currentTime);
      });
    }
  }, []);

  return (
    <div className={classNames('message', { 'message--isme': isMe })}>
      <div className="message__avatar">
        <UserAvatar name={name} size={36} src={user.avatar && user.avatar.thumb} />
      </div>
      <div className="message__content">
        {
          <div className="message__content-bubble">
            {
              <p>
                {reactStringReplace(
                  text,
                  /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}])/gu,
                  (match, i) => {
                    const emojiData = getEmojiDataFromNative(match, 'apple', data);
                    if (emojiData !== null) {
                      return (
                        <Emoji
                          key={i}
                          emoji={emojiData && emojiData.colons}
                          set="apple"
                          size={24}
                        />
                      );
                    }
                  },
                )}
              </p>
            }
            {attachments.length > 0 && !attachments[0].isAudio && (
              <div className="message__content-bubble__attachments">
                {attachments &&
                  attachments.map((item) => (
                    <LazyLoadComponent key={item._id}>
                      <Image
                        loading="lazy"
                        className="message__image"
                        preview={{
                          icons: [],
                          destroyOnClose: true,
                          src: `${item.url}`,
                          mask: <EyeOutlined />,
                        }}
                        src={item.thumb}
                      />
                    </LazyLoadComponent>
                  ))}
              </div>
            )}
            {attachments.length > 0 &&
              attachments[0].isAudio &&
              attachments.map(
                (item) =>
                  (item.ext === 'webm' || item.ext === 'ogg') && (
                    <div key={item._id} className="message__content-audio">
                      <audio id="audio" ref={audioRef} src={item.url} preload="metadata" />
                      <div className="message__audio-progress" style={{ width: `${duration}%` }} />
                      <div className="message__audio-info">
                        <div className="message__audio-btn">
                          <Button type="link" onClick={togglePlay}>
                            {isPlaying ? (
                              <svg
                                id="svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  className="path"
                                  d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                  stroke="#3A456B"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                id="svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  className="path"
                                  d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z"
                                  stroke="#3A456B"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  className="path"
                                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                  stroke="#3A456B"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </Button>
                        </div>
                        <div className="message__audio-wave">
                          <svg
                            className="svg"
                            width="121"
                            height="30"
                            viewBox="0 0 121 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              className="path"
                              d="M5 5.5C5 5.22386 4.77614 5 4.5 5C4.22386 5 4 5.22386 4 5.5L5 5.5ZM4 24.5C4 24.7761 4.22386 25 4.5 25C4.77614 25 5 24.7761 5 24.5L4 24.5ZM45 5.5C45 5.22386 44.7761 5 44.5 5C44.2239 5 44 5.22386 44 5.5H45ZM44 24.5C44 24.7761 44.2239 25 44.5 25C44.7761 25 45 24.7761 45 24.5H44ZM85 5.5C85 5.22386 84.7761 5 84.5 5C84.2239 5 84 5.22386 84 5.5H85ZM84 24.5C84 24.7761 84.2239 25 84.5 25C84.7761 25 85 24.7761 85 24.5H84ZM37 5.5C37 5.22386 36.7761 5 36.5 5C36.2239 5 36 5.22386 36 5.5H37ZM36 24.5C36 24.7761 36.2239 25 36.5 25C36.7761 25 37 24.7761 37 24.5H36ZM77 5.5C77 5.22386 76.7761 5 76.5 5C76.2239 5 76 5.22386 76 5.5H77ZM76 24.5C76 24.7761 76.2239 25 76.5 25C76.7761 25 77 24.7761 77 24.5H76ZM117 5.5C117 5.22386 116.776 5 116.5 5C116.224 5 116 5.22386 116 5.5H117ZM116 24.5C116 24.7761 116.224 25 116.5 25C116.776 25 117 24.7761 117 24.5H116ZM9 8.5C9 8.22386 8.77614 8 8.5 8C8.22386 8 8 8.22386 8 8.5L9 8.5ZM8 21.5C8 21.7761 8.22386 22 8.5 22C8.77614 22 9 21.7761 9 21.5L8 21.5ZM49 8.5C49 8.22386 48.7761 8 48.5 8C48.2239 8 48 8.22386 48 8.5H49ZM48 21.5C48 21.7761 48.2239 22 48.5 22C48.7761 22 49 21.7761 49 21.5H48ZM89 8.5C89 8.22386 88.7761 8 88.5 8C88.2239 8 88 8.22386 88 8.5H89ZM88 21.5C88 21.7761 88.2239 22 88.5 22C88.7761 22 89 21.7761 89 21.5H88ZM25 8.5C25 8.22386 24.7761 8 24.5 8C24.2239 8 24 8.22386 24 8.5H25ZM24 21.5C24 21.7761 24.2239 22 24.5 22C24.7761 22 25 21.7761 25 21.5H24ZM65 8.5C65 8.22386 64.7761 8 64.5 8C64.2239 8 64 8.22386 64 8.5H65ZM64 21.5C64 21.7761 64.2239 22 64.5 22C64.7761 22 65 21.7761 65 21.5H64ZM105 8.5C105 8.22386 104.776 8 104.5 8C104.224 8 104 8.22386 104 8.5H105ZM104 21.5C104 21.7761 104.224 22 104.5 22C104.776 22 105 21.7761 105 21.5H104ZM1 10.5C1 10.2239 0.776142 10 0.5 10C0.223858 10 -1.20706e-08 10.2239 0 10.5L1 10.5ZM4.37114e-07 20.5C4.49185e-07 20.7761 0.223858 21 0.5 21C0.776143 21 1 20.7761 1 20.5L4.37114e-07 20.5ZM121 10.5C121 10.2239 120.776 10 120.5 10C120.224 10 120 10.2239 120 10.5H121ZM120 20.5C120 20.7761 120.224 21 120.5 21C120.776 21 121 20.7761 121 20.5H120ZM41 10.5C41 10.2239 40.7761 10 40.5 10C40.2239 10 40 10.2239 40 10.5H41ZM40 20.5C40 20.7761 40.2239 21 40.5 21C40.7761 21 41 20.7761 41 20.5H40ZM81 10.5C81 10.2239 80.7761 10 80.5 10C80.2239 10 80 10.2239 80 10.5H81ZM80 20.5C80 20.7761 80.2239 21 80.5 21C80.7761 21 81 20.7761 81 20.5H80ZM13 6.5C13 6.22386 12.7761 6 12.5 6C12.2239 6 12 6.22386 12 6.5L13 6.5ZM12 23.5C12 23.7761 12.2239 24 12.5 24C12.7761 24 13 23.7761 13 23.5L12 23.5ZM53 6.5C53 6.22386 52.7761 6 52.5 6C52.2239 6 52 6.22386 52 6.5H53ZM52 23.5C52 23.7761 52.2239 24 52.5 24C52.7761 24 53 23.7761 53 23.5H52ZM93 6.5C93 6.22386 92.7761 6 92.5 6C92.2239 6 92 6.22386 92 6.5H93ZM92 23.5C92 23.7761 92.2239 24 92.5 24C92.7761 24 93 23.7761 93 23.5H92ZM29 6.5C29 6.22386 28.7761 6 28.5 6C28.2239 6 28 6.22386 28 6.5H29ZM28 23.5C28 23.7761 28.2239 24 28.5 24C28.7761 24 29 23.7761 29 23.5H28ZM69 6.5C69 6.22386 68.7761 6 68.5 6C68.2239 6 68 6.22386 68 6.5H69ZM68 23.5C68 23.7761 68.2239 24 68.5 24C68.7761 24 69 23.7761 69 23.5H68ZM109 6.5C109 6.22386 108.776 6 108.5 6C108.224 6 108 6.22386 108 6.5H109ZM108 23.5C108 23.7761 108.224 24 108.5 24C108.776 24 109 23.7761 109 23.5H108ZM17 8.5C17 8.22386 16.7761 8 16.5 8C16.2239 8 16 8.22386 16 8.5H17ZM16 21.5C16 21.7761 16.2239 22 16.5 22C16.7761 22 17 21.7761 17 21.5H16ZM57 8.5C57 8.22386 56.7761 8 56.5 8C56.2239 8 56 8.22386 56 8.5H57ZM56 21.5C56 21.7761 56.2239 22 56.5 22C56.7761 22 57 21.7761 57 21.5H56ZM97 8.5C97 8.22386 96.7761 8 96.5 8C96.2239 8 96 8.22386 96 8.5H97ZM96 21.5C96 21.7761 96.2239 22 96.5 22C96.7761 22 97 21.7761 97 21.5H96ZM33 8.5C33 8.22386 32.7761 8 32.5 8C32.2239 8 32 8.22386 32 8.5H33ZM32 21.5C32 21.7761 32.2239 22 32.5 22C32.7761 22 33 21.7761 33 21.5H32ZM73 8.5C73 8.22386 72.7761 8 72.5 8C72.2239 8 72 8.22386 72 8.5H73ZM72 21.5C72 21.7761 72.2239 22 72.5 22C72.7761 22 73 21.7761 73 21.5H72ZM113 8.5C113 8.22386 112.776 8 112.5 8C112.224 8 112 8.22386 112 8.5H113ZM112 21.5C112 21.7761 112.224 22 112.5 22C112.776 22 113 21.7761 113 21.5H112ZM21 0.5C21 0.223858 20.7761 -1.81621e-08 20.5 0C20.2239 1.81621e-08 20 0.223858 20 0.5L21 0.5ZM20 29.5C20 29.7761 20.2239 30 20.5 30C20.7761 30 21 29.7761 21 29.5L20 29.5ZM61 0.5C61 0.223858 60.7761 0 60.5 0C60.2239 0 60 0.223858 60 0.5H61ZM60 29.5C60 29.7761 60.2239 30 60.5 30C60.7761 30 61 29.7761 61 29.5H60ZM101 0.5C101 0.223858 100.776 0 100.5 0C100.224 0 100 0.223858 100 0.5H101ZM100 29.5C100 29.7761 100.224 30 100.5 30C100.776 30 101 29.7761 101 29.5H100ZM4 5.5L4 24.5L5 24.5L5 5.5L4 5.5ZM44 5.5V24.5H45V5.5H44ZM84 5.5V24.5H85V5.5H84ZM36 5.5V24.5H37V5.5H36ZM76 5.5V24.5H77V5.5H76ZM116 5.5V24.5H117V5.5H116ZM8 8.5L8 21.5L9 21.5L9 8.5L8 8.5ZM48 8.5V21.5H49V8.5H48ZM88 8.5V21.5H89V8.5H88ZM24 8.5V21.5H25V8.5H24ZM64 8.5V21.5H65V8.5H64ZM104 8.5V21.5H105V8.5H104ZM0 10.5L4.37114e-07 20.5L1 20.5L1 10.5L0 10.5ZM120 10.5V20.5H121V10.5H120ZM40 10.5V20.5H41V10.5H40ZM80 10.5V20.5H81V10.5H80ZM12 6.5L12 23.5L13 23.5L13 6.5L12 6.5ZM52 6.5V23.5H53V6.5H52ZM92 6.5V23.5H93V6.5H92ZM28 6.5V23.5H29V6.5H28ZM68 6.5V23.5H69V6.5H68ZM108 6.5V23.5H109V6.5H108ZM16 8.5V21.5H17V8.5H16ZM56 8.5V21.5H57V8.5H56ZM96 8.5V21.5H97V8.5H96ZM32 8.5V21.5H33V8.5H32ZM72 8.5V21.5H73V8.5H72ZM112 8.5V21.5H113V8.5H112ZM20 0.5L20 29.5L21 29.5L21 0.5L20 0.5ZM60 0.5V29.5H61V0.5H60ZM100 0.5V29.5H101V0.5H100Z"
                              fill="#fff"
                            />
                          </svg>
                        </div>
                        <span className="message__audio-duration">
                          {toCurrentTime(currentTime)}
                        </span>
                      </div>
                    </div>
                  ),
              )}
          </div>
        }

        <div className="message__content-date">{toDate(date)}</div>
      </div>
    </div>
  );
};

export default Message;
