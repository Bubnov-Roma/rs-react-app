import Header from '@/shared/ui/header';
import ProvidersClient from './providers';
import '@/app/globals.css';

export const metadata = {
  title: 'Pokémon Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersClient>
          <Header />
          <main>{children}</main>
        </ProvidersClient>
      </body>
    </html>
  );
}
