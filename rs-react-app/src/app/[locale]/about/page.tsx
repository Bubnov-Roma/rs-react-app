import styles from './style.module.css';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  const totalPokemons = 1010;
  const randomPokemonId = Math.floor(Math.random() * totalPokemons) + 1;

  return (
    <div className={styles.about_page}>
      <p className={styles.title}>{t('title')}</p>

      <div className={styles.aboutContent}>
        <p className={styles.text}>{t('text')}</p>

        <div className={styles.pokemonImage}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemonId}.png`}
            alt="Funny Pokemon"
            width={300}
            height={300}
            priority
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#888" stroke-width="2" fill="#f0f0f0"/>
    <circle cx="12" cy="12" r="3" fill="#888"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#888" stroke-width="2"/>
  </svg>
`)}`}
          />
        </div>
      </div>
    </div>
  );
}
