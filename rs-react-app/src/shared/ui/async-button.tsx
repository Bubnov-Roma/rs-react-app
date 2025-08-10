import styles from './style.module.css';
interface AsyncButtonProps {
  onClick: () => Promise<void>;
  isLoading: boolean;
  progress?: number;
  disabled?: boolean;
  label: string;
  showProgress?: boolean;
  className?: string;
}

export const AsyncButton = ({
  onClick,
  isLoading,
  progress = 0,
  disabled,
  label,
  showProgress = false,
  className,
}: AsyncButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className ?? ''}`}
    >
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
            {showProgress && `${progress}%`}
          </span>
        </>
      ) : (
        <span className={styles.buttonText}>{label}</span>
      )}
    </button>
  );
};
