import React from 'react';

// error boundary component to prevent app from crashing in the event of an error in the app
export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // props.children refers to line 2 below, where
    // we specify the contents of the error boundary component
    // there is no error, render MyWidget
    return this.props.children;
  }
}
