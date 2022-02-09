import React from 'react';
import './index.scss';
import attach from '../../assets/img/word.png';
import { Button } from 'antd';
import toDate from '../../helpers/ToDate';

const UserAttach = ({ attachments }) => {
  return (
    <>
      {attachments &&
        attachments.map((file) => (
          <li className="attachs__list-item">
            <div className="attachs__list-item__prevIcon">
              <img src={file.thumb} alt="" />
            </div>
            <div className="attachs__list-item__body">
              <div className="item__body-top">
                <p className="attach__title">{file.filename}</p>
              </div>
              <div className="item__body-bottom">
                <div className="attach__date">
                  {file.createdAt ? toDate(file.createdAt) : new Date()}
                </div>
                <div className="attach__size">{file.size / 1024}</div>
              </div>
            </div>
            <Button type="text" className="attachs__list-item__download app-icon">
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
