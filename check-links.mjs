/// @ts-check

import { globbySync } from 'globby';
import * as fs from 'fs';
import * as path from 'path';
import { URL } from 'url';
const pagesDir = path.join(new URL('.', import.meta.url).pathname, 'pages');
const cwd = path.join(pagesDir, 'blog');

const files = globbySync('*.mdx', {
  absolute: false,
  cwd,
});

const errors = [];

files.forEach((file) =>
  checkFile(file.replace('.mdx', ''), (error) => {
    errors.push(error);
  })
);

if (errors.length) {
  errors.forEach((error) => {
    console.error(error);
  });
  process.exit(1);
}

/**
 * @param {string} name
 * @param {Function} onError
 */
function checkFile(name, onError) {
  const filepath = path.join(cwd, name) + '.mdx';
  const doc = fs.readFileSync(filepath, {
    encoding: 'utf-8',
  });

  const links = onlyRelative(extractLinks(doc));

  links.forEach((link) => {
    if (!exists(link.href)) {
      onError(`
        ERROR: ${filepath}
          ${link.href} doesn't exist
      `);
    }
  });
}

/**
 * @param {string} link
 */
function exists(link) {
  const filepath = path.join(pagesDir, link) + '.mdx';

  return fs.existsSync(filepath);
}

/**
 * @typedef {{title: string; href: string;}} Link
 */

/**
 * @param {string} doc
 * @returns {Link[]}
 */
function extractLinks(doc) {
  const links = [];
  const mdLinks = extractMdLinks(doc);
  const previews = extractPreviews(doc);

  if (mdLinks) {
    links.push(...mdLinks);
  }

  if (previews) {
    links.push(...previews);
  }

  return links;
}

/**
 * @param {string} doc
 * @returns {Link[]}
 */
function extractMdLinks(doc) {
  const links = doc.match(/\[([^\[\]]+)\]\(([^)]+)\)/g);

  if (!links) {
    return [];
  }

  return links.map((link) => {
    let [title, href] = link.split('](');

    title = title.replace(/^\[/, '');
    href = href.replace(/\)$/, '');

    if (href.includes('#')) {
      href = href.split('#')[0];
    }

    return {
      title,
      href,
    };
  });
}

/**
 * @param {string} doc
 * @returns {Link[]}
 */
function extractPreviews(doc) {
  const links = doc.match(
    /\<LinkPreview \s*link=[\"\']{1}([^\"\']+)[\"\']{1}\s*\/\>/g
  );

  if (!links) {
    return [];
  }

  return links.map((link) => {
    return {
      title: '',
      href: link
        .replace(/\<LinkPreview \s*link=[\"\']{1}/, '')
        .replace(/[\"\']{1}\s*\/\>/, ''),
    };
  });
}

/**
 * @param {Link[]} links
 * @returns {Link[]}
 */
function onlyRelative(links) {
  return links.filter(
    (link) =>
      link.href.startsWith('.') ||
      (link.href.startsWith('/') &&
        !link.href.startsWith('/blog-assets/') &&
        !link.href.startsWith('/medium/'))
  );
}
