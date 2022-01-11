import { Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Emoji, getEmojiDataFromNative } from 'emoji-mart';
import { EyeOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';
import data from 'emoji-mart/data/all.json';
import './index.scss';

import play from '../../assets/img/icons/play.svg';
import pause from '../../assets/img/icons/pause.svg';
import UserAvatar from '../Avatar';
import toDate from '../../helpers/ToDate';

const Message = ({ isMe, name, text, date, attachments, audio, dateToNow }) => {
  // const audioElem = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);

  // const togglePlay = () => {
  //   if (!isPlaying) {
  //     audioElem.current.play();
  //   } else {
  //     audioElem.current.pause();
  //   }
  // };

  // useEffect(() => {
  //   audioElem.current.volume = '0.01';
  //   audioElem.current.addEventListener(
  //     'playing',
  //     () => {
  //       setIsPlaying(true);
  //     },
  //     false,
  //   );
  //   audioElem.current.addEventListener(
  //     'ended',
  //     () => {
  //       setIsPlaying(false);
  //       setProgress(0);
  //       setCurrentTime(0);
  //     },
  //     false,
  //   );
  //   audioElem.current.addEventListener(
  //     'pause',
  //     () => {
  //       setIsPlaying(false);
  //     },
  //     false,
  //   );
  //   audioElem.current.addEventListener('timeupdate', () => {
  //     const duration = (audioElem.current && audioElem.current.duration) || 0;
  //     setCurrentTime(audioElem.current.currentTime);
  //     setProgress((audioElem.current.currentTime / duration) * 100);
  //   });
  // }, []);
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
                {attachments.map((item) =>
                  item.ext === 'jpg' || 'jpeg' || 'png' || 'gif' ? (
                    <Image
                      className="message__image"
                      key={item._id}
                      preview={{
                        mask: <EyeOutlined />,
                      }}
                      src={item.url}
                    />
                  ) : (
                    console.log(123)
                    // <div className="message__audio">
                    //   <audio ref={audioElem} src={item.src} preload="auto" />
                    //   <div className="message__audio-progress" style={{ width: progress + '%' }} />
                    //   <div className="message__audio-info">
                    //     <div className="message__audio-btn">
                    //       <button onClick={togglePlay}>
                    //         {isPlaying ? (
                    //           <img src={pause} alt="Pause svg" />
                    //         ) : (
                    //           <img src={play} alt="Play svg" />
                    //         )}
                    //       </button>
                    //     </div>
                    //     <div className="message__audio-wave">
                    //       {/* <img src={waveSvg} alt="Wave svg" /> */}
                    //     </div>
                    //     <span className="message__audio-duration">{currentTime}</span>
                    //   </div>
                    // </div>
                  ),
                )}
              </div>
            )}
          </div>
        )}

        <div className="message__content-date">{toDate(date)}</div>
      </div>
    </div>
  );
};

export default Message;
