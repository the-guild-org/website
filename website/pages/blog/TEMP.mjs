import { execSync } from 'node:child_process';
import fs from 'node:fs';

const files = await fs.globSync('./**/*.mdx');

const TAGS_TO_REMOVE = [
  'graphql',
  'graphql-hive',
  'codegen',
  'graphql-federation',
];

const postsToRemove = [];
const postsToKeep = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  let tags = content.match(/tags: \[(.*?)\]/)?.[1];
  if (tags) {
    tags = tags.split(',').map((tag) => tag.trim());
    
    if (TAGS_TO_REMOVE.some((tag) => tags.includes(tag))) {
      postsToRemove.push(file);
    } else {
      postsToKeep.push(file);
    }
  } else {
    postsToKeep.push(file);
  }
} 


for (const post of postsToRemove) {
  fs.unlinkSync(post);

  let nextConfig = fs.readFileSync('../../next.config.js', 'utf-8');
  const marker = '// Blog posts moved to the Hive blog'
  let start = nextConfig.indexOf(marker);
  start += marker.length;
  // we'll add a line below the marker
  const filename = post.replace('.mdx', '');
  const oldPath = `/blog/${filename}`;
  const newPath = `https://the-guild.dev/graphql/hive/blog/${filename}`;
  const line = `\n      '${oldPath}': '${newPath}',`;
  nextConfig = nextConfig.slice(0, start) + line + nextConfig.slice(start);
  fs.writeFileSync('../../next.config.js', nextConfig);

  execSync(`git add ${post}`);
  execSync(`git commit -m "Remove ${post}"`);
}

