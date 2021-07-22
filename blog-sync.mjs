import { toVFile } from 'to-vfile';
import { unified } from 'unified';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import mdx from 'remark-mdx';
import { visit } from 'unist-util-visit';
import { remove } from 'unist-util-remove';
import { walk } from 'estree-walker';
import { Client } from 'guild-devto-nodejs-sdk';
import globby from 'globby';
import details from './ui/authors.js';

const DEV_TO_TOKEN = process.env.DEV_TO_TOKEN;
const DEV_TO_ORG_ID = 4467;

const baseDir = './pages/blog/';
// const files = globby.sync('*.mdx', {
//   absolute: false,
//   cwd: baseDir,
// });
const files = ['better-type-safety-for-resolvers-with-graphql-codegen.mdx'];

const processor = unified()
  .use(parse, { position: false })
  .use(stringify)
  .use(mdx)
  .use(extractMeta);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function syncToDevTo(items) {
  console.log(`=== Syncing ${items.length} articles to dev.to... ===`);
  const client = new Client(DEV_TO_TOKEN);
  const { data: allArticles } = await client.selfAllArticles({
    per_page: 1000,
    page: 0,
  });

  for (const item of items) {
    const exists = allArticles.find((t) => t.canonicalUrl === item.canonical);
    const author = details.authors[item.meta.author];
    const markdown = `> This article was published on ${item.meta.date} by [${author.name}](${author.link}) @ [The Guild Blog](https://the-guild.dev/)\n\n${item.markdown} `;
    const image = item.meta.image
      ? item.meta.image.startsWith('/')
        ? `https://the-guild.dev${item.meta.image}`
        : item.meta.image
      : undefined;

    if (exists) {
      console.log(
        `Article "${item.meta.title}" already exists, updating if needed...`
      );

      if (exists.bodyMarkdown !== markdown) {
        console.log(`   -> Updating...`);

        await client.updateArticle(exists.id, {
          article: {
            title: item.meta.title,
            bodyMarkdown: markdown,
            canonicalUrl: item.meta.canonical || item.canonical,
            description: item.meta.description,
            mainImage: image,
            tags: (item.meta.tags || []).map((t) => t.replace(/[-_ ]/g, '')),
          },
        });
        await sleep(10000);
        console.log(`   -> Done!`);
      } else {
        console.log(`   -> Up to date!`);
      }
    } else {
      console.log(`Creating article "${item.meta.title}" on DevTo...`);

      await client.createArticle({
        article: {
          title: item.meta.title,
          bodyMarkdown: markdown,
          canonicalUrl: item.meta.canonical || item.canonical,
          description: item.meta.description,
          organizationId: DEV_TO_ORG_ID,
          mainImage: image,
          published: true,
          tags: (item.meta.tags || []).map((t) => t.replace(/[-_ ]/g, '')),
        },
      });
      await sleep(10000);
    }
  }
}

async function main() {
  const items = [];

  for (const blogFile of files) {
    try {
      const vfile = toVFile.readSync(`${baseDir}${blogFile}`);
      const { value, data } = await processor.process(vfile);
      const cleanName = blogFile.split('.').slice(0, -1).join('.');

      if (String(data.meta.skipSync) !== 'true') {
        items.push({
          slug: cleanName,
          canonical: `https://the-guild.dev/blog/${cleanName}`,
          markdown: value,
          meta: data.meta,
        });
      }
    } catch (e) {
      console.error(`Building clean MD failed for "${blogFile}"...`);
      throw e;
    }
  }

  await syncToDevTo(items);
}

main();

function extractMeta() {
  return (tree, file) => {
    const meta = {};

    visit(tree, (node, index, parent) => {
      if (node.type === 'mdxjsEsm') {
        if (node.value.includes('export const meta')) {
          walk(node.data.estree, {
            enter(node) {
              if (node.type === 'Property') {
                meta[node.key.name] =
                  node.value.type === 'ArrayExpression'
                    ? node.value.elements.map((n) => n.value)
                    : node.value.value;
              }
            },
          });
        }

        return;
      } else if (node.type === 'mdxJsxFlowElement') {
        if (node.name === 'Gfycat') {
          const gifId = node.attributes
            .find((a) => a.name === 'gifId')
            .value.value.replace(/['"]/g, '');

          parent.children.splice(index, 1, {
            type: 'text',
            value: `<img width="100%" style="width:100%" src="https://thumbs.gfycat.com/${gifId}-size_restricted.gif">`,
            position: node.position,
          });
        } else if (node.name === 'CodeSandbox') {
          const boxId = node.attributes
            .find((a) => a.name === 'codeSandboxId')
            .value.value.replace(/['"]/g, '');

          parent.children.splice(index, 1, {
            type: 'text',
            value: `{% codesandbox ${boxId} %}`,
            position: node.position,
          });
        }
      }
    });

    file.data.meta = meta;
    remove(tree, 'mdxjsEsm');
  };
}
