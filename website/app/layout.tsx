import { FC, ReactNode } from 'react';
import { getDefaultMetadata, GuildLayout } from '@theguild/components';
import { getPageMap } from '@theguild/components/nextra';
import '@theguild/components/style.css';

const description = 'Modern, Open-source API Tooling and Ecosystem that scales';
const websiteName = 'The Guild';

export const metadata = getDefaultMetadata({
  description,
  websiteName,
  productName: 'GUILD',
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <GuildLayout
      headProps={{
        backgroundColor: {
          dark: 'rgb(15, 17, 20)',
          light: 'rgb(250, 250, 250)',
        },
      }}
      logo={null}
      websiteName={websiteName}
      description={description}
      layoutProps={{
        pageMap: await getPageMap(),
        docsRepositoryBase:
          'https://github.com/the-guild-org/the-guild-website/tree/master/website',
      }}
    >
      {children}
    </GuildLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
