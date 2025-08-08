import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from '../interfaces';
import style from './style.module.css';

interface PropsWithNavigate extends ErrorBoundaryProps {
  navigate?: (path: string) => void;
}

export class ErrorBoundary extends Component<
  PropsWithNavigate,
  ErrorBoundaryState
> {
  constructor(props: PropsWithNavigate) {
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
    const page = localStorage.getItem('page');
    const numberPage = page ? parseInt(page, 10) : 1;
    this.props.navigate?.(`/page/${numberPage}`);
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
