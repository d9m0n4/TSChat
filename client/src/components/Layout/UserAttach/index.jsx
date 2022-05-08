import React from 'react';
import './index.scss';
import { Button } from 'antd';
import formatDate from '../../../helpers/formateDate';
import { saveAs } from 'file-saver';

const UserAttach = ({ attachments }) => {
  const saveFile = (url, name) => {
    saveAs(url, name);
  };
  return (
    <>
      {attachments &&
        attachments.slice(-5).map((file) => (
          <li className="attachs__list-item" key={file._id}>
            <div className="attachs__list-item__prevIcon">
              {file.isAudio ? (
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
              ) : (
                <img src={file.thumb} alt="" />
              )}
            </div>
            <div className="attachs__list-item__body">
              <div className="item__body-top">{file.filename}</div>
              <div className="item__body-bottom">
                <div className="attach__date">
                  {file.createdAt ? formatDate(file.createdAt) : new Date()}
                </div>
                <div className="attach__size">{(file.size / 1024000).toFixed(2)}MB</div>
              </div>
            </div>

            <Button
              onClick={() => saveFile(file.url, file.filename)}
              type="text"
              className="attachs__list-item__download app-icon">
              <svg
                className="icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  className="rect"
                  d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4"
                  stroke="#979797"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </li>
        ))}
    </>
  );
};

export default UserAttach;
