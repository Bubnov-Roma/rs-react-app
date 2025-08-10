import { useEffect } from 'react';
import styles from './style.module.css';

type SnackbarProps = {
  message: string | null;
  isError?: boolean;
  duration?: number;
  onClose: () => void;
};

export const Snackbar = ({
  message,
  isError,
  duration = 3000,
  onClose,
}: SnackbarProps) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      className={`${styles.snackbar} ${isError ? styles.error : styles.success}`}
    >
      {message}
    </div>
  );
};
