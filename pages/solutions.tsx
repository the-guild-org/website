import { FC } from 'react';
import { GetStaticProps } from 'next/types';
import { styled } from '../stitches.config';
import { Page } from '../ui/shared/Page';
import { Container } from '../ui/shared/Layout';
import { HeroSection } from '../ui/hero-section';
import { Description, GenericLink, Heading } from '../ui/components';

const categories: { title: string; items: { title: string; url: string }[] }[] =
  [
    {
      title: 'Guides',
      items: [
        {
          title: 'GraphQL Error Handling',
          url: 'https://www.the-guild.dev/blog/graphql-error-handling-with-fp',
        },
        {
          title: 'GraphQL Authentication',
          url: 'https://www.the-guild.dev/blog/graphql-authentication-with-envelop-and-auth0',
        },
        {
          title: 'GraphQL Caching',
          url: 'https://www.the-guild.dev/blog/graphql-response-caching-with-envelop',
        },
        {
          title: 'Client-side GraphQL typings',
          url: 'https://www.the-guild.dev/blog/typed-document-node',
        },
        {
          title: 'GraphQL over WebSockets',
          url: 'https://www.the-guild.dev/blog/graphql-over-websockets',
        },
        {
          title: 'GraphQL over SEE',
          url: 'https://www.the-guild.dev/blog/graphql-over-sse',
        },
        {
          title: 'Migrate a REST API to GraphQL',
          url: 'https://www.graphql-mesh.com/docs/getting-started/your-first-mesh-gateway',
        },
        {
          title: 'Securing your GraphQL API',
          url: 'https://www.envelop.dev/docs/guides/securing-your-graphql-api',
        },
        {
          title: 'Monitor your GraphQL API',
          url: 'https://www.envelop.dev/docs/guides/monitoring-and-tracing',
        },
      ],
    },
    {
      title: 'GraphQL at scale',
      items: [
        {
          title: 'Schema Stitching',
          url: 'https://www.the-guild.dev/blog/a-new-year-for-schema-stitching',
        },
        {
          title: 'Manage your Schemas',
          url: 'https://www.the-guild.dev/blog/graphql-hive-preview',
        },
        {
          title: 'GraphQL Gateway with GraphQL Mesh',
          url: 'https://www.graphql-mesh.com/docs/introduction',
        },
      ],
    },
  ];

interface Props {
  resources: typeof categories;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      resources: categories,
    },
  };
};

const Section = styled('div', {
  textAlign: 'left',
  lineHeight: '30px',
  background: 'none',
  marginBottom: '20px',
});

const OpenSource: FC<Props> = ({ resources }) => {
  return (
    <Page
      title="Solutions"
      description="Recommended GraphQL ressources"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Solutions</Heading>
        <Description>Essential GraphQL ressources</Description>
      </HeroSection>

      <Container>
        {resources.map((cat) => (
          <Section key={cat.title}>
            <p>
              <Heading size="md">{cat.title}</Heading>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.title}>
                    <GenericLink href={item.url}>{item.title}</GenericLink>
                  </li>
                ))}
              </ul>
            </p>
          </Section>
        ))}
      </Container>
      <p>&nbsp;</p>
    </Page>
  );
};

export default OpenSource;
