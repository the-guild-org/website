export const definedTags: {
  [tag: string]: {
    title: string;
    description: string;
  };
} = {
  graphql: {
    title: 'GraphQL',
    description: 'Articles about GraphQL and its ecosystem.',
  },
  'graphql-federation': {
    title: 'GraphQL Federation',
    description: 'Articles about GraphQL federation, Apollo Federation, and more.',
  },
  'graphql-hive': {
    title: 'GraphQL Hive',
    description:
      'Articles about Hive - Open Source GraphQL Federation Platform (Registry, Gateway, and more)',
  },
  'graphql-mesh': {
    title: 'GraphQL Mesh',
    description: 'Articles about GraphQL Mesh - Query anything, run anywhere',
  },
};

export function extractRelevantTags(
  articles: Array<{
    tags?: string[];
  }>,
) {
  const allTags = articles.flatMap(article => article.tags || []);
  const tagMap: {
    [tag: string]: {
      count: number;
      title: string;
    };
  } = {};

  for (const tag of allTags) {
    // eslint-disable-next-line logical-assignment-operators
    if (!tagMap[tag]) {
      tagMap[tag] = {
        count: 0,
        title: definedTags[tag]?.title ?? tag,
      };
    }
    tagMap[tag].count += 1;
  }

  const top10: Array<{
    tag: string;
    title: string;
    count: number;
  }> = Object.entries(tagMap)
    // Sort by count
    .sort((a, b) => b[1].count - a[1].count)
    // Take top 10
    .slice(0, 10)
    // Map to the final format
    .map(([tag, { title, count }]) => ({ tag, title, count }));


  // Return only top 10 as we could have more
  // than 10 because of the important tags
  return top10.slice(0, 10);
}
