import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './error-boundary';
import { ErrorBoundaryProps } from '../interfaces';

export function ErrorBoundaryNavigate(
  props: Omit<ErrorBoundaryProps, 'navigate'>
) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}
