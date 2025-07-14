import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../interfaces';
import { setStorage } from '../storage';
import style from './style.module.css';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  refreshPage = () => {
    setStorage('');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.error_boundary}>
          <h1 className={style.message}>Something went wrong.</h1>
          <button className={style.button} onClick={this.refreshPage}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
