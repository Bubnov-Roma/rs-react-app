'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/navigation';
import { ThemeToggle } from './theme-toggle';
import style from './style.module.css';
import { LanguageSwitcher } from './language-switcher';

export default function Header() {
  const t = useTranslations('Header');
  const searchParams = useSearchParams();

  const query = searchParams.toString();

  const mainHref = query ? `/main?${query}` : `/main`;

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Link href={mainHref}>
          <h1>{t('title')}</h1>
        </Link>
        <nav className={style.navigation_bar}>
          <Link href={mainHref}>{t('main')}</Link>
          <Link href={`/about`}>{t('about')}</Link>
        </nav>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
