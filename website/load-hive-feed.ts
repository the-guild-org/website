import * as fs from 'node:fs';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

await parser
  .parseURL('https://the-guild.dev/graphql/hive/blog/feed.xml')
  .then(feed =>
    fs.writeFileSync(__dirname + '/lib/hive-blog-feed.json', JSON.stringify(feed, null, 2)),
  )
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
