import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import { Button, Input } from 'antd';
import { UploadField } from '@navjobs/upload';
import './index.scss';
import UploadedFile from '../UploadedFile';

const { TextArea } = Input;

const ChatInput = ({
  onSendMessage,
  onChange,
  value,
  setEmoji,
  setFiles,
  attachments,
  toggleVisiblePicker,
  visiblePicker,
}) => {
  return (
    <div className="messages__input-group">
      <div className="messages-input">
        <div className="messages-input__buttons">
          <UploadField
            onFiles={setFiles}
            uploadProps={{
              accept: '.pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif,',
              multiple: 'multiple',
            }}>
            <Button type="text" className="button__icon app-icon">
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
          </UploadField>

          <Button type="text" className="button__icon app-icon" onClick={toggleVisiblePicker}>
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
            onChange={onChange}
            className="textfield"
            placeholder="Введите сообщение... "
            autoSize={{ minRows: 1, maxRows: 5 }}
            value={value}
          />
        </div>
        <Button
          disabled={!value}
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
        <div className="emoji-picker">
          {visiblePicker && (
            <Picker
              perLine={6}
              set="apple"
              showSkinTones={false}
              showPreview={false}
              onSelect={(emojiTag) => setEmoji(emojiTag)}
            />
          )}
        </div>
      </div>

      <div className="uploaded__files">
        <UploadedFile attachments={attachments} />
      </div>
    </div>
  );
};

export default ChatInput;
