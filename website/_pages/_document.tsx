import { Head } from 'next/document';
import { OrganizationJsonLd } from 'next-seo';
import { getCssText } from '../stitches.config';

<Head>
  <OrganizationJsonLd
    url="https://the-guild.dev"
    logo="https://the-guild.dev/static/logo.svg"
    name="The Guild"
  />
  <style dangerouslySetInnerHTML={{ __html: getCssText() }} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="RSS Feed for the-guild.dev"
    href="/feed.xml"
  />
</Head>;
