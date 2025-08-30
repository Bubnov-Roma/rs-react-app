'use client';
import styles from './page-loader.module.css';
export default function PageLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.pokeball}></div>
      <div className={styles.sparks}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
