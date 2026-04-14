import { HomePageClient } from '@/components/HomePageClient';
import { getServerConfig } from '@/lib/server-config';
import packageJson from '../../package.json';

export default function HomePage() {
  const serverConfig = getServerConfig();

  return <HomePageClient serverConfig={serverConfig} appVersion={packageJson.version} />;
}
