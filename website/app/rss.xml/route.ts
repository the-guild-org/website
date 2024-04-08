import fs from 'node:fs/promises';
import path from 'node:path';
import { compileMdx } from 'nextra/compile';
import RSS from 'rss';

const SITE_URL = 'https://graphql.org';

export async function GET() {
  // const blogs = await fs.readdir('./src/pages/blog');
  //
  // blogs.sort((a, b) => b.frontMatter.date - a.frontMatter.date);

  const feed = new RSS({
    title: 'Blog | GraphQL',
    description: 'Blog | GraphQL',
    generator: 'Next.js',
    // feed_url: `${SITE_URL}/blog/rss.xml`,
    // site_url: SITE_URL,
    // // managingEditor: "info@graphql.org",
    // // webMaster: "info@graphql.org",
    // copyright: `Copyright © ${new Date().getFullYear()} The GraphQL Foundation. All rights reserved.`,
    // language: 'en-US',
    // // Published date as last blog post date
    // pubDate: blogs[0].frontMatter.date.toUTCString(),
    // ttl: 60,
  });

  // for (const { frontMatter } of blogs) {
  //   feed.item({
  //     title: frontMatter.title,
  //     description: frontMatter.description.slice(0, 139) + '…',
  //     url: `${SITE_URL}/blog/${frontMatter.fileName}`,
  //     categories: frontMatter.tags,
  //     author: frontMatter.byline,
  //     date: frontMatter.date.toUTCString(),
  //   });
  // }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
