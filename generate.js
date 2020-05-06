const { slug } = require('github-slugger');
const { data } = require('./blogposts.json');
const { writeFileSync } = require('fs');

const slugs = [];

data.repository.issues.edges.forEach((edge) => {
  const { body, title } = edge.node;
  const urlSlug = slug(title).replace(/(^-)|(-$)/, '');

  if (slugs.includes(urlSlug)) {
    console.warn(urlSlug);
  }

  const meta = {
    date: extractPublishDate(body),
    title,
    description: 'TODO:',
    image: extractImage(body),
  };

  slugs.push(urlSlug);

  writeFileSync(
    `generated/${urlSlug}.mdx`,
    [
      `
import withPost from "../../ui/blog/post";

export const meta = {
  title: "${title}",
  tags: [],
  date: "${meta.date}",
  description: "${meta.description}",
  image: "${meta.image}",
};
      
export default withPost({ ...meta });
  `,
      body,
    ].join('\n\n'),
    'utf-8'
  );
});

console.log(slugs);

function extractPublishDate(body) {
  const [, meta] = body.split('```backmatter');

  const date = new Date(JSON.parse(meta.replace('```', '')).publishedDate);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function extractImage(body) {
  if (!body.startsWith('![](')) {
    return '';
  }

  const [, img] = body.match(/\!\[\]\((.*)\?raw=true/);

  return img;
}
