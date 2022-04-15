import React from 'react';
import { Redirect } from 'react-router-dom';

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
      return <h1>ОШИБКА</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
