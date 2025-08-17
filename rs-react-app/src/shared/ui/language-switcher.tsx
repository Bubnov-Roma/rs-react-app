'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './language-switcher.module.css';

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const t = useTranslations('Header');

  const currentLang = pathname?.startsWith('/en') ? 'en' : 'ru';
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${open ? styles.open : ''}`}
      ref={ref}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={styles.trigger}
        aria-label={t('switch')}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          focusable="false"
          className={styles.icon}
        >
          <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
        </svg>
      </button>
      <ul className={styles.dropdown}>
        {languages.map((lang) => (
          <li key={lang.code}>
            <Link
              href={pathname?.replace(/^\/(en|ru)/, `/${lang.code}`) || '/'}
              className={currentLang === lang.code ? styles.active : ''}
              onClick={() => setOpen(false)}
            >
              {lang.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
