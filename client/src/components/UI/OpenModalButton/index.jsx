import { Button } from 'antd';
import React from 'react';

function OpenModalButton({ fn }) {
  return (
    <Button onClick={fn} className="app-icon" type="text">
      <svg
        className="icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className="rect"
          d="M12 4V20M20 12L4 12"
          stroke="#979797"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}

export default OpenModalButton;
