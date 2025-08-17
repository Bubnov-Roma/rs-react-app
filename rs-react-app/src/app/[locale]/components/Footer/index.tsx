'use client';

import Link from 'next/link';
import styles from './footer.module.css';
import { RSLogo } from './rs-logo';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="RS School"
        >
          <RSLogo width={35} height={35} />
        </Link>
        <p>© {new Date().getFullYear()} Pokédex</p>
        <Link
          href="https://github.com/Bubnov-Roma"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.8-1.5-3.8-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 1.6 2.6 1.1 3.2.8.1-.7.4-1.1.7-1.3-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.4.1-2.9 0 0 1-.3 3.2 1.2.9-.2 1.8-.3 2.8-.3s1.9.1 2.8.3c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.6.1 2.9.8.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.3.8.9.8 1.9v2.9c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}
