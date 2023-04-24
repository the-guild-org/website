/* eslint-disable no-console */
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { globbySync } from 'globby';

const PAGES_DIR = join(process.cwd(), 'pages');
const CWD = join(PAGES_DIR, 'blog');

const files = globbySync('*.mdx', {
  absolute: false,
  cwd: CWD,
}).filter(filename => filename !== 'nextra-2.mdx');

const errors = [];

for (const file of files)
  checkFile(file.replace('.mdx', ''), error => {
    errors.push(error);
  });

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error);
  }
  process.exit(1);
}

console.log('✅  Links checked!');

function checkFile(name: string, onError: (err: string) => void) {
  const filepath = join(CWD, `${name}.mdx`);
  const doc = readFileSync(filepath, 'utf-8');
  const links = onlyRelative(extractLinks(doc));

  for (const link of links) {
    if (!exists(link.href)) {
      onError(
        `❌  Error in \`${relative(process.cwd(), filepath)}\` link \`${link.href}\` doesn't exist`,
      );
    }
  }
}

function exists(link: string): boolean {
  const filepath = join(PAGES_DIR, `${link}.mdx`);
  return existsSync(filepath);
}

type Link = {
  title: string;
  href: string;
};

function extractLinks(doc: string): Link[] {
  const mdLinks = extractMdLinks(doc);
  const previews = extractPreviews(doc);

  return [...mdLinks, ...previews];
}

function extractMdLinks(doc: string): Link[] {
  const links = doc.match(/\[([^[\]]+)\]\(([^)]+)\)/g);

  if (!links) {
    return [];
  }

  return links.map(link => {
    let [title, href] = link.split('](');

    title = title.replace(/^\[/, '');
    href = href.replace(/\)$/, '');

    if (href.includes('#')) {
      href = href.split('#')[0];
    }
    return { title, href };
  });
}

function extractPreviews(doc: string): Link[] {
  const links = doc.match(/<LinkPreview \s*link=["']{1}([^"']+)["']{1}\s*\/>/g);

  if (!links) {
    return [];
  }

  return links.map(link => {
    return {
      title: '',
      href: link.replace(/<LinkPreview \s*link=["']{1}/, '').replace(/["']{1}\s*\/>/, ''),
    };
  });
}

function onlyRelative(links: Link[]): Link[] {
  const IGNORE_URL = new Set([
    '/static/shared-logos/products/envelop.svg',
    '/blog/tag/graphql-tools',
    '/contact',
    '/discord',
    '/open-source',
  ]);

  return links.filter(link => {
    if (IGNORE_URL.has(link.href)) return;

    if (link.href.startsWith('/graphql/hive')) return;
    if (link.href.startsWith('/graphql/yoga-server')) return;
    if (link.href.startsWith('/graphql/codegen')) return;

    return (
      link.href.startsWith('.') ||
      (link.href !== '/' &&
        link.href.startsWith('/') &&
        !link.href.startsWith('/blog-assets/') &&
        !link.href.startsWith('/medium/'))
    );
  });
}
