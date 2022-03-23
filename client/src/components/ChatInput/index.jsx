import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { Button, Input, Upload } from 'antd';
import Icon from '@ant-design/icons';
import './index.scss';
import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ChatInput = ({
  onSendMessage,
  onChange,
  value,
  setEmoji,
  toggleVisiblePicker,
  visiblePicker,
  record,
  handleStop,
  isRecording,
  uploaderProps,
  uploading,
  canvas,
  audioResult,
  handleTyping,
  emojiPicker,
}) => {
  return (
    <div className="messages__input-group">
      {!isRecording ? (
        <div
          className={
            uploaderProps.fileList.length && uploaderProps.fileList[0].name !== 'audio'
              ? 'messages-input pt-80'
              : 'messages-input'
          }>
          {uploaderProps.fileList[0] && uploaderProps.fileList[0].name === 'audio' ? (
            <div className="message-input__audio">
              <Button
                disabled={uploading}
                type="text"
                icon={<CloseCircleOutlined />}
                onClick={uploaderProps.onRemove}
              />
              <canvas className="audio__message" ref={audioResult} />
            </div>
          ) : (
            <>
              <div className="messages-input__buttons">
                <Upload
                  accept=".jpg, .png, .gif"
                  disabled={uploading}
                  className="uploadInput"
                  withCredentials={true}
                  method="GET"
                  {...uploaderProps}
                  listType="picture"
                  maxCount={3}
                  multiple>
                  <Button disabled={uploading} type="text" className="button__icon app-icon">
                    <svg
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        className="rect"
                        d="M15.1716 7L8.58579 13.5858C7.80474 14.3668 7.80474 15.6332 8.58579 16.4142C9.36684 17.1953 10.6332 17.1953 11.4142 16.4142L17.8284 9.82843C19.3905 8.26633 19.3905 5.73367 17.8284 4.17157C16.2663 2.60948 13.7337 2.60948 12.1716 4.17157L5.75736 10.7574C3.41421 13.1005 3.41421 16.8995 5.75736 19.2426C8.1005 21.5858 11.8995 21.5858 14.2426 19.2426L20.5 13"
                        stroke="#979797"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Button>
                </Upload>
                <Button
                  disabled={uploading}
                  type="text"
                  className="button__icon app-icon"
                  onClick={toggleVisiblePicker}>
                  <svg
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="rect"
                      d="M14.8284 14.8284C13.2663 16.3905 10.7337 16.3905 9.17157 14.8284M9 10H9.01M15 10H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#979797"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
              <div className="messages-input__textarea">
                <TextArea
                  disabled={uploading}
                  onChange={onChange}
                  className="textfield"
                  placeholder="Введите сообщение... "
                  autoSize={{ minRows: 1, maxRows: 5 }}
                  value={value}
                  onKeyUp={handleTyping}
                />
              </div>
            </>
          )}

          {uploading ? (
            <Icon className="loading__icon" style={{ fontSize: 24 }} component={LoadingOutlined} />
          ) : (
            <>
              {value || uploaderProps.fileList.length ? (
                <Button
                  onClick={onSendMessage}
                  type="text"
                  className="messages-input__send app-icon">
                  <svg
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="rect"
                      d="M5 12L3 21L21 12L3 3L5 12ZM5 12L13 12"
                      stroke="#979797"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              ) : (
                <Button onClick={record} type="text" className="messages-input__send app-icon">
                  <svg
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="rect"
                      d="M19 11C19 14.866 15.866 18 12 18M12 18C8.13401 18 5 14.866 5 11M12 18V22M12 22H8M12 22H16M12 14C10.3431 14 9 12.6569 9 11V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V11C15 12.6569 13.6569 14 12 14Z"
                      stroke="#979797"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              )}
            </>
          )}

          <div className="emoji-picker" ref={emojiPicker}>
            {visiblePicker && (
              <Picker
                enableFrequentEmojiSort={true}
                perLine={6}
                set="apple"
                showSkinTones={false}
                showPreview={false}
                onSelect={(emojiTag) => setEmoji(emojiTag)}
                i18n={{
                  search: 'Поиск',
                  categories: {
                    search: 'Результаты поиска',
                    recent: 'Часто используемые',
                    smileys: 'Смайлы',
                    people: 'Люди',
                    nature: 'Животные и природа',
                    foods: 'Еда и напитки',
                    activity: 'Activity',
                    places: 'Места и путешествия',
                    objects: 'Objects',
                    symbols: 'Символы',
                    flags: 'Флаги',
                    custom: 'Кастом',
                  },
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="message__audio">
          <Button className="message__audio-stop" type="text" onClick={handleStop}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                stroke="#CC4B4C"
                strokeOpacity="1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 8C7 7.44772 7.44772 7 8 7H12C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13H8C7.44772 13 7 12.5523 7 12V8Z"
                stroke="#CC4B4C"
                strokeOpacity="1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <canvas ref={canvas} />
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatInput);
