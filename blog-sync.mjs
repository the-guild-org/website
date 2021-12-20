// Can't understand how to convert this file to ts 🤷‍
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
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// import not working, use require instead
const { authors } = require('./ui/authors.ts');

const DEV_TO_ORG_ID = 4467;

const baseDir = './pages/blog/';
const files = globby.sync('*.mdx', {
  absolute: false,
  cwd: baseDir,
});

const processor = unified()
  .use(parse, { position: false })
  .use(stringify)
  .use(mdx)
  .use(extractMeta);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function syncToDevTo(items) {
  console.log(`=== Syncing ${items.length} articles to dev.to... ===`);
  const client = new Client(process.env.DEV_TO_TOKEN);
  const { data: allArticles } = await client.selfAllArticles({
    per_page: 1000,
    page: 0,
  });

  for (const item of items) {
    try {
      const canonicalUrl = item.meta.canonical || item.canonical;
      const exists = allArticles.find((t) => t.canonicalUrl === canonicalUrl);
      const author =
        authors[
          Array.isArray(item.meta.authors)
            ? item.meta.authors[0]
            : item.meta.author
        ];
      const markdown = `> This article was published on ${item.meta.date} by [${author.name}](${author.link}) @ [The Guild Blog](https://the-guild.dev/)\n\n${item.markdown} `;
      const image = item.meta.image
        ? item.meta.image.startsWith('/')
          ? `https://the-guild.dev${item.meta.image}`
          : item.meta.image
        : undefined;
      const tags = (item.meta.tags || [])
        .map((t) => t.replace(/[-_ ]/g, ''))
        .slice(0, 4);

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
              canonicalUrl,
              description: item.meta.description,
              mainImage: image,
              tags,
            },
          });
          console.log(`   -> Done!`);
          console.log(
            `... waiting before next request to avoid rate-limit ...`
          );
          await sleep(30 * 1000);
        } else {
          console.log(`   -> Up to date!`);
        }
      } else {
        console.log(`Creating article "${item.meta.title}" on DevTo...`);

        await client.createArticle({
          article: {
            title: item.meta.title,
            bodyMarkdown: markdown,
            canonicalUrl,
            description: item.meta.description,
            organizationId: DEV_TO_ORG_ID,
            mainImage: image,
            published: true,
            tags,
          },
        });
        console.log(`... waiting before next request to avoid rate-limit ...`);
        await sleep(30 * 1000);
      }
    } catch (e) {
      console.log(
        `Failed to send article to dev.to, error: `,
        e,
        item,
        e.response?.status || e,
        e.response?.statusText,
        e.response?.data
      );
      process.exit(1);
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

      console.log(value, data);

      if (String(data.meta.skipSync) !== 'true') {
        items.push({
          slug: cleanName,
          canonical: `https://the-guild.dev/blog/${cleanName}`,
          markdown: value.replace(/\\<img/gi, '<img'),
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
    const embedOptions = {};

    visit(tree, (node, index, parent) => {
      if (node.type === 'image') {
        if (node.url.startsWith('/')) {
          node.url = `https://the-guild.dev${node.url}`;
        }
      } else if (node.type === 'mdxjsEsm') {
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
        } else if (node.value.includes('export const embedOptions')) {
          walk(node.data.estree, {
            enter(node) {
              if (node.type === 'Property') {
                embedOptions[node.key.name] =
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
            value: `<img width="100%" style="width:100%" src="https://thumbs.gfycat.com/${gifId}-size_restricted.gif" />`,
            position: node.position,
          });
        } else if (node.name === 'iframe') {
          const src = node.attributes.find((a) => a.name === 'src').value;

          if (src && src.includes('youtube')) {
            const parts = src.split('/');
            const videoId = parts[parts.length - 1];

            parent.children.splice(index, 1, {
              type: 'text',
              value: `{% youtube ${videoId} %}`,
              position: node.position,
            });
          }
        } else if (node.name === 'LinkPreview') {
          const link = node.attributes
            .find((a) => a.name === 'link')
            .value.replace(/['"]/g, '');

          parent.children.splice(index, 1, {
            type: 'text',
            value: link,
            position: node.position,
          });
        } else if (node.name === 'Tweet') {
          const tweetLink = node.attributes
            .find((a) => a.name === 'tweetLink')
            .value.replace(/['"]/g, '');
          const parts = tweetLink.split('/');
          const tweetId = parts[parts.length - 1];

          if (tweetId) {
            parent.children.splice(index, 1, {
              type: 'text',
              value: `{% twitter ${tweetId} %}`,
              position: node.position,
            });
          }
        } else if (node.name === 'YouTube') {
          const youTubeId = node.attributes
            .find((a) => a.name === 'youTubeId')
            .value.replace(/['"]/g, '');

          parent.children.splice(index, 1, {
            type: 'text',
            value: `{% youtube ${youTubeId} %}`,
            position: node.position,
          });
        } else if (node.name === 'StackBlitz') {
          const stackBlitzId = node.attributes
            .find((a) => a.name === 'stackBlitzId')
            .value.replace(/['"]/g, '');
          const file = node.attributes
            .find((a) => a.name === 'file')
            .value?.replace(/['"]/g, '');

          parent.children.splice(index, 1, {
            type: 'text',
            value: `{% stackblitz ${stackBlitzId} ${
              file ? `file=${file}` : ''
            } %}`,
            position: node.position,
          });
        } else if (node.name === 'CodeSandbox') {
          const boxId = node.attributes
            .find((a) => a.name === 'codeSandboxId')
            .value.value.replace(/['"]/g, '');
          const childEmbedOptions = {};
          const childEmbedOptionsNode = node.attributes.find(
            (a) => a.name === 'embedOptions'
          );

          if (childEmbedOptionsNode) {
            walk(childEmbedOptionsNode.value.data.estree, {
              enter(node) {
                if (node.type === 'Property') {
                  childEmbedOptions[node.key.name] =
                    node.value.type === 'ArrayExpression'
                      ? node.value.elements.map((n) => n.value)
                      : node.value.value;
                }
              },
            });
          }

          const allEmbedOptions = {
            ...embedOptions,
            ...childEmbedOptions,
          };

          if (boxId.startsWith('github/')) {
            const optionsQueryString = Object.keys(allEmbedOptions)
              .map((k) => `${k}=${allEmbedOptions[k]}`)
              .join('&');

            parent.children.splice(index, 1, {
              type: 'text',
              value: `https://codesandbox.io/embed/${boxId}?${optionsQueryString}`,
              position: node.position,
            });
          } else {
            const optionsQueryString = Object.keys(allEmbedOptions)
              .filter((k) =>
                ['module', 'runonclick', 'initialpath'].includes(k)
              )
              .map((k) => {
                const [item] = allEmbedOptions[k].split(',');

                return `${k}=${item.startsWith('/') ? item.substr(1) : item}`;
              })
              .join(' ');

            parent.children.splice(index, 1, {
              type: 'text',
              value: `{% codesandbox ${boxId} ${optionsQueryString} %}`,
              position: node.position,
            });
          }
        }
      }
    });

    file.data.meta = meta;
    remove(tree, 'mdxjsEsm');
  };
}
