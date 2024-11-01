import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { OgCard } from '@/shared/embed/og-card';
import { StackBlitz } from '@/shared/embed/stack-blitz';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

export default defineConfig({
  head: function useHead() {
    return (
      <>
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
    CodeSandbox,
    LinkPreview,
    OgCard,
    Gfycat,
    StackBlitz,
  },
});
