import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { Section, Hero, Container, Button } from '../ui/shared/Layout';
import { Page } from '../ui/shared/Page';
import { Featured } from '../ui/shared/Featured';
import { MetaWithLink } from '../lib/types';
import { getAllArticles } from '../lib/get-all-articles';
import { LastArticles } from '../ui/blog/last-articles';
import { Newsletter } from '../ui/blog/newsletter';

const BlogSection = styled(Section)`
  padding: 50px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  margin: 0;

  & > span {
    color: var(--colors-accent);
  }
`;

const BlogLastArticle = styled(LastArticles)`
  margin-top: 50px !important;
  margin-bottom: 50px !important;
  padding: 0 !important;
`;

const BlogButton = styled(Button)`
  display: inline-block;
  margin: 25px 0;
  background-color: var(--colors-primary);

  &:hover {
    background-color: var(--colors-dim-dark);
  }

  & > * {
    margin-right: 1.3rem;
  }
`;

const ProductsSection = styled(Section)`
  padding: 50px 0;
  background-color: #fff;
  text-align: center;

  &::before {
    border-color: transparent transparent #fff transparent;
  }
`;

const FeaturedProduct = styled(Featured).attrs({
  width: 80,
  noShadow: true,
  maxCoverSize: 200,
})`
  padding: 50px 0;
`;

const Separator = styled.div`
  margin: 30px auto;
  width: 50px;
  height: 2px;
  background-color: var(--colors-accent-light);
`;

const NewsletterContainer = styled(Container)`
  padding: 0 0 75px 0;
`;

const NewsletterSignUp = styled(Newsletter)`
  margin-top: 0 !important;
`;

interface Props {
  articles: MetaWithLink[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      articles: await getAllArticles(),
    },
  };
};

const Index: React.FC<Props> = ({ articles }) => {
  const recentArticles = articles.slice(0, 3);

  return (
    <Page title="The Guild - Open Source" description="Open Source Developers">
      <Hero>
        We are <span>The Guild</span>
      </Hero>

      {/* Blog */}
      <BlogSection>
        <Container>
          <SectionTitle>
            We have a <span>blog</span>
          </SectionTitle>
          <BlogLastArticle articles={recentArticles} />
          <Link href="/blog" passHref={true}>
            <BlogButton as="a" title="Read our blog">
              View all posts
            </BlogButton>
          </Link>
        </Container>
      </BlogSection>

      {/* Products */}
      <ProductsSection>
        <Container>
          <SectionTitle>
            We do <span>Open Source</span>
          </SectionTitle>
          <FeaturedProduct
            title="Code Generation and Type Safety"
            image="https://graphql-code-generator.com/img/gql-codegen-cover.png"
            link="https://graphql-code-generator.com/"
            description={
              <>
                <p>
                  GraphQL Code Generator is a tool that generates code out of
                  your GraphQL schema and Operations.
                </p>
                <p>
                  Official support for TypeScript, Flow, React, Angular,
                  MongoDB, Stencil, Reason, and more.
                </p>
              </>
            }
          />
          <Separator />
          <FeaturedProduct
            title="Consistency and Analysis of GraphQL"
            image="https://graphql-inspector.com/img/logo.svg"
            link="https://graphql-inspector.com/"
            description={
              <>
                <p>
                  GraphQL Inspector is a set of tools to help you better
                  maintain and improve GraphQL API as well as GraphQL consumers.
                </p>
                <p>
                  Integrates with GitHub and runs in any Continous Integration
                  and Delivery pipeline.
                </p>
              </>
            }
          />
          <Separator />
          <FeaturedProduct
            title="Query anything, run everywhere"
            image="https://graphql-mesh.com/img/mesh-text-logo.svg"
            link="https://graphql-mesh.com/"
            description={
              <p>
                GraphQL Mesh allows you to use GraphQL query language to access
                data in remote APIs that don't run GraphQL (and also ones that
                do run GraphQL). It can be used as a gateway to other services,
                or run as a local GraphQL schema that aggregates data from
                remote APIs.
              </p>
            }
          />
          <BlogButton
            as="a"
            href="https://github.com/the-guild-org/Stack"
            title="View our Tech Stack"
          >
            View all projects
          </BlogButton>
        </Container>
      </ProductsSection>

      <NewsletterContainer>
        <NewsletterSignUp />
      </NewsletterContainer>
    </Page>
  );
};

export default Index;
