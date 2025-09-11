import * as fs from 'node:fs';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

const feed = await parser.parseURL('https://the-guild.dev/graphql/hive/blog/feed.xml');
fs.writeFileSync(__dirname + '/lib/hive-blog-feed.json', JSON.stringify(feed, null, 2));
