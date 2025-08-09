import { useEffect, useState } from 'react';
import styles from './style.module.css';

interface AsyncButtonProps {
  onClick: () => Promise<void>;
  isLoading: boolean;
  progress?: number;
  disabled?: boolean;
  label: string;
  loadingLabel?: string;
  showProgress?: boolean;
  toast?: {
    message: string;
    isError?: boolean;
  } | null;
}

export const AsyncButton = ({
  onClick,
  isLoading,
  progress = 0,
  disabled,
  label,
  loadingLabel = 'Updating...',
  showProgress = false,
  toast,
}: AsyncButtonProps) => {
  const [internalToast, setInternalToast] = useState(toast);

  useEffect(() => {
    if (toast) {
      setInternalToast(toast);
      const timeout = setTimeout(() => setInternalToast(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return (
    <div className={styles.container}>
      <button onClick={onClick} disabled={disabled} className={styles.button}>
        {isLoading && showProgress && (
          <div
            className={styles.progressOverlay}
            style={{ width: `${progress}%` }}
          />
        )}
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            <span className={styles.buttonText}>
              {loadingLabel} {showProgress && `${progress}%`}
            </span>
          </>
        ) : (
          <span className={styles.buttonText}>{label}</span>
        )}
      </button>
      {internalToast && (
        <div
          className={`${styles.toast} ${
            internalToast.isError ? styles.error : styles.success
          }`}
        >
          {internalToast.message}
        </div>
      )}
    </div>
  );
};
