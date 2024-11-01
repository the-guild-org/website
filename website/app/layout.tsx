import { FC, ReactNode } from 'react';
import { IBM_Plex_Sans } from 'next/font/google';
import { getDefaultMetadata, GuildLayout, Search } from '@theguild/components';
import { getPageMap } from '@theguild/components/nextra';
import '@theguild/components/style.css';
import './globals.css';

const description = 'Modern, Open-source API Tooling and Ecosystem that scales';
const websiteName = 'The Guild';

export const metadata = getDefaultMetadata({
  description,
  websiteName,
  productName: 'GUILD',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <GuildLayout
      websiteName={websiteName}
      description={description}
      logo={null}
      htmlProps={{
        className: ibmPlexSans.className,
      }}
      headProps={{
        backgroundColor: {
          dark: 'rgb(15, 17, 20)',
          light: 'rgb(250, 250, 250)',
        },
      }}
      layoutProps={{
        pageMap: await getPageMap(),
        docsRepositoryBase:
          'https://github.com/the-guild-org/the-guild-website/tree/master/website',
        search: <Search placeholder="Search…" />,
      }}
    >
      {children}
    </GuildLayout>
  );
};

export default RootLayout;
