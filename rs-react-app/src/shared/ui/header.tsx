'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import style from './style.module.css';

export default function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();

  const isEnglish = pathname?.startsWith('/en');
  const switchTo = isEnglish ? 'ru' : 'en';

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1>{t('title')}</h1>
        <nav className={style.navigation_bar}>
          <Link href={`/?page=${1}`}>{t('main')}</Link>
          <Link href="/about">{t('about')}</Link>
        </nav>
        <Link href={`/${switchTo}`} style={{ marginLeft: '1rem' }}>
          {t('switch')}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
