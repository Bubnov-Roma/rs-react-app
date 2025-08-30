'use client';

import { useRouter } from 'next/navigation';
import ErrorBoundaryBase from './error-boundary-base';

export function ErrorBoundary(props: { children: React.ReactNode }) {
  const router = useRouter();

  const refreshPage = () => {
    router.push('/');
  };

  return <ErrorBoundaryBase {...props} refreshPage={refreshPage} />;
}
