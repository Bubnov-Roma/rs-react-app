import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import ProvidersClient from './providers';
import Header from '@/shared/ui/header';
import PageLoader from '@/app/[locale]/components/PageLoader';
import '@/app/[locale]/globals.css';
import { getPokemonList } from '@/features/pokemon-api/server';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = (await import(`../../i18n/messages/${locale}.json`)).default;

  const pokemons = await getPokemonList();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProvidersClient initialList={pokemons}>
            <PageLoader />
            <Header />
            <main>{children}</main>
          </ProvidersClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
