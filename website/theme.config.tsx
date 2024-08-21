import { Video } from '@/components';
import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { OgCard } from '@/shared/embed/og-card';
import { StackBlitz } from '@/shared/embed/stack-blitz';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, defineConfig, Steps, useConfig } from '@theguild/components';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

const siteDescription = 'Modern, Open-source API Tooling and Ecosystem that scales';
const siteName = 'The Guild';

export default defineConfig({
  backgroundColor: {
    dark: '15,17,20',
    light: '250,250,250',
  },
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/website', // base URL for the docs repository
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig();

    const title = `${pageTitle} (${siteName})`;
    const {
      description = `${siteName}: ${siteDescription}`,
      canonical,
      image,
      thumbnail,
    } = frontMatter;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta
          name="og:image"
          content={ensureAbsolute(
            thumbnail ||
              image ||
              `https://og-image.the-guild.dev/?product=GUILD&title=${encodeURI(pageTitle)}`,
          )}
        />
        <meta property="og:site_name" content={siteName} />
      </>
    );
  },
  components: {
    Callout,
    Video,
    CodeSandbox,
    LinkPreview,
    OgCard,
    Gfycat,
    Tweet,
    StackBlitz,
    Steps,
  },
  websiteName: 'The Guild',
  description: siteDescription,
  search: {
    placeholder: 'Search…',
  },
});
