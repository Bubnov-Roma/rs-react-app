import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import ProvidersClient from '../providers';
import Header from '@/shared/ui/header';
import '@/app/globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = (await import(`../../i18n/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProvidersClient>
            <Header />
            <main>{children}</main>
          </ProvidersClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
