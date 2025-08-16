import ProvidersClient from '@/app/providers';
import HomeClient from '@/app/[locale]/home-client';

export default async function HomePage() {
  return (
    <ProvidersClient>
      <HomeClient />
    </ProvidersClient>
  );
}
