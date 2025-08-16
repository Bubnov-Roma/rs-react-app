// 'use client';

// import { ThemeToggle, PageContext } from '@/shared';
// import style from './style.module.css';
// import Link from 'next/link';
// import { useContext } from 'react';

// export function Header() {
//   const context = useContext(PageContext);
//   if (!context) {
//     throw new Error('PageContext must be used within a PageProvider');
//   }
//   const { numberPage } = context;

//   return (
//     <header className={style.header}>
//       <div className={style.wrapper}>
//         <h1 className={style.title}>
//           <Link href="/">Pokémon Search</Link>
//         </h1>
//         <nav className={style.navigation_bar}>
//           <Link href={`/?${1}`}>Main</Link>
//           <Link href={`about`}>About</Link>
//         </nav>
//         <ThemeToggle />
//       </div>
//     </header>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import style from './style.module.css';
// import { ThemeToggle } from '@/shared';
// import { ensureSearchParams } from '@/utils';

// export default function Header() {
//   const sp = ensureSearchParams(useSearchParams());
//   const page = sp.get('page') ?? '1';

//   return (
//     <header className={style.header}>
//       <div className={style.wrapper}>
//         <h1 className={style.title}>
//           <Link href="/">Pokémon Search</Link>
//         </h1>
//       </div>
//       <nav className={style.navigation_bar}>
//         <Link href={`/?page=${page}`}>Main</Link>
//         <Link href="/about">About</Link>
//       </nav>
//       <ThemeToggle />
//     </header>
//   );
// }

'use client';

import { ThemeToggle } from '@/shared';
import style from './style.module.css';
// import { useMemo } from 'react';
import Link from 'next/link'; // We'll switch to next-intl's Link later

export default function Header() {
  // const page = useMemo(() => {
  //   if (typeof window === 'undefined') return 1;
  //   const sp = new URLSearchParams(window.location.search);
  //   const p = Number(sp.get('page') || 1);
  //   return Number.isFinite(p) && p > 0 ? p : 1;
  // }, []);

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <h1 className={style.title}>
          <Link href="/">Pokémon Search</Link>
        </h1>
        <nav className={style.navigation_bar}>
          <Link href={`/?page=${1}`}>Main</Link>
          <Link href="/about">About</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
