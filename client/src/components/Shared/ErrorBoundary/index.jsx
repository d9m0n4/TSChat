import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  componentDidCatch(error, hasError) {
    this.setState({
      error,
      hasError,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="warning"
          title="Что то пошло не так :("
          extra={
            <Link to="/">
              <Button onClick={() => this.state.error === null} type="primary" key="console">
                Назад
              </Button>
            </Link>
          }
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
