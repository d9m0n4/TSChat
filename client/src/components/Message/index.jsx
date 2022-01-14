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

const Message = ({ isMe, name, text, date, attachments, dateToNow }) => {
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
      audioRef.current.addEventListener('ended', () => {
        console.log('end');
        setIsPlaying(false);
        setDuration(0);
        setCurrentTime(0);
      });

      audioRef.current.addEventListener('timeupdate', (e) => {
        setCurrentTime(e.target.currentTime);
        const duration = Math.floor((e.target.currentTime / e.target.duration) * 100);
        setDuration(duration);
      });
    }

    return () => {
      console.log('clean');
    };
  }, [isPlaying]);

  return (
    <div className={classNames('message', { 'message--isme': isMe })}>
      <div className="message__avatar">
        <UserAvatar name={name} size={36} />
      </div>
      <div className="message__content">
        {text && attachments && (
          <div className="message__content-bubble">
            <p>
              {reactStringReplace(
                text,
                /([\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}])/gu,
                (match, i) => {
                  const emojiData = getEmojiDataFromNative(match, 'apple', data);
                  if (emojiData !== null) {
                    return (
                      <Emoji key={i} emoji={emojiData && emojiData.colons} set="apple" size={24} />
                    );
                  }
                },
              )}
            </p>
            {attachments.length > 0 && (
              <div className="message__content-bubble__attachments">
                {attachments &&
                  attachments.map((item) => (
                    <Image
                      className="message__image"
                      key={item._id}
                      preview={{
                        mask: <EyeOutlined />,
                      }}
                      src={item.url}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
        {attachments &&
          !text &&
          attachments.map(
            (item) =>
              item.ext === 'webm' && (
                <div key={item._id} className="message__content-bubble">
                  <audio id="audio" ref={audioRef} src={item.url} preload="auto" />
                  <div className="message__audio-progress" style={{ width: `${duration}%` }} />
                  <div className="message__audio-info">
                    <div className="message__audio-btn">
                      <Button type="link" onClick={togglePlay}>
                        {isPlaying ? (
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10 9V15M14 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#3A456B"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M14.7519 11.1679L11.5547 9.03647C10.8901 8.59343 10 9.06982 10 9.86852V14.1315C10 14.9302 10.8901 15.4066 11.5547 14.9635L14.7519 12.8321C15.3457 12.4362 15.3457 11.5638 14.7519 11.1679Z"
                              stroke="#3A456B"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
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
                    <div className="message__audio-wave"></div>
                    <span className="message__audio-duration">{toCurrentTime(currentTime)}</span>
                  </div>
                </div>
              ),
          )}

        <div className="message__content-date">{toDate(date)}</div>
      </div>
    </div>
  );
};

export default Message;
