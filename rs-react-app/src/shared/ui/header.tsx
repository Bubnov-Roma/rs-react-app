'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import style from './style.module.css';
import { LanguageSwitcher } from './language-switcher';

export default function Header() {
  const t = useTranslations('Header');

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Link href={`/?page=${1}`}>
          <h1>{t('title')}</h1>
        </Link>
        <nav className={style.navigation_bar}>
          <Link href={`/?page=${1}`}>{t('main')}</Link>
          <Link href="/about">{t('about')}</Link>
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
