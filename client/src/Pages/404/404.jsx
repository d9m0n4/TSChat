import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function notFoundPage() {
  return (
    <Result
      className="notFound__page"
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Link to="/">
          <Button type="primary">На главную</Button>
        </Link>
      }
    />
  );
}

export default notFoundPage;
