'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import styles from './page-loader.module.css';

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    setVisible(true);

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(false), 300);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${
        loading ? styles.fadeIn : styles.fadeOut
      }`}
    >
      <div className={styles.loader}>
        <div className={styles.pokeball}></div>
        <div className={styles.sparks}>
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
      </div>
    </div>
  );
}
