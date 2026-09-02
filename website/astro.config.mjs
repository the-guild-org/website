import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://the-guild.dev',
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  // The website-router worker redirects trailing-slash URLs to their
  // slashless form. Directory-style output makes Cloudflare Pages redirect
  // the other way (/blog -> /blog/), causing an infinite 308 loop — so
  // emit file-style output (blog.html) and slashless URLs everywhere.
  build: { format: 'file' },
  trailingSlash: 'never',
});
