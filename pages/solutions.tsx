import { ReactElement } from 'react';
import { Page } from '../ui/shared/Page';
import { HeroSection } from '../ui/hero-section';
import { Description, Heading, Link } from '../ui/components';

const categories: { title: string; items: { title: string; url: string }[] }[] =
  [
    {
      title: 'Guides',
      items: [
        {
          title: 'GraphQL Error Handling',
          url: 'https://the-guild.dev/blog/graphql-error-handling-with-fp',
        },
        {
          title: 'GraphQL Authentication',
          url: 'https://the-guild.dev/blog/graphql-authentication-with-envelop-and-auth0',
        },
        {
          title: 'GraphQL Caching',
          url: 'https://the-guild.dev/blog/graphql-response-caching-with-envelop',
        },
        {
          title: 'Client-side GraphQL typings',
          url: 'https://the-guild.dev/blog/typed-document-node',
        },
        {
          title: 'GraphQL over WebSockets',
          url: 'https://the-guild.dev/blog/graphql-over-websockets',
        },
        {
          title: 'GraphQL over SEE',
          url: 'https://the-guild.dev/blog/graphql-over-sse',
        },
        {
          title: 'Migrate a REST API to GraphQL',
          url: 'https://graphql-mesh.com/docs/getting-started/your-first-mesh-gateway',
        },
        {
          title: 'Securing your GraphQL API',
          url: 'https://envelop.dev/docs/guides/securing-your-graphql-api',
        },
        {
          title: 'Monitor your GraphQL API',
          url: 'https://envelop.dev/docs/guides/monitoring-and-tracing',
        },
      ],
    },
    {
      title: 'GraphQL at scale',
      items: [
        {
          title: 'Schema Stitching',
          url: 'https://the-guild.dev/blog/a-new-year-for-schema-stitching',
        },
        {
          title: 'Manage your Schemas',
          url: 'https://the-guild.dev/blog/graphql-hive-preview',
        },
        {
          title: 'GraphQL Gateway with GraphQL Mesh',
          url: 'https://graphql-mesh.com/docs/introduction',
        },
      ],
    },
  ];

const OpenSource = (): ReactElement => {
  return (
    <Page
      title="Solutions"
      description="Recommended GraphQL resources"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Solutions</Heading>
        <Description>Essential GraphQL resources</Description>
      </HeroSection>

      {categories.map((cat) => (
        <div className="text-center mb-10" key={cat.title}>
          <Heading size="md">{cat.title}</Heading>
          <ul className="flex flex-col gap-2">
            {cat.items.map((item) => (
              <li key={item.title}>
                <Link href={item.url}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Page>
  );
};

export default OpenSource;
