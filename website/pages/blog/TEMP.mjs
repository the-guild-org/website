// find all blog posts
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

const raport = `
${postsToRemove.length} posts will be removed
${postsToKeep.length} posts will be kept

# posts to remove

${postsToRemove.map((post) => `- ${post}`).join('\n')}

# posts to keep

${postsToKeep.map((post) => `- ${post}`).join('\n')}
`;

fs.writeFileSync('./RAPORT.md', raport);
