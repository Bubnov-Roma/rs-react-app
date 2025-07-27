import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './error-boundary';

export function ErrorBoundaryNavigate(props) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}
