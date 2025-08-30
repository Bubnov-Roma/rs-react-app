import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import ProvidersClient from './providers';
import Header from '@/shared/ui/header';
import PageLoader from '@/app/[locale]/main/components/PageLoader';
import '@/app/[locale]/globals.css';
import Footer from './main/components/Footer';

export default async function AppLayout({
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
            <PageLoader />
            <Header />
            <main>{children}</main>
            <Footer />
          </ProvidersClient>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
