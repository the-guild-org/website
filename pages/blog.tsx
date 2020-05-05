import React from "react";
import styled from "styled-components";
import { Page } from "../ui/shared/Page";
import { Hero, Section, Container } from "../ui/shared/Layout";
import { LastArticle } from "../ui/blog/last-article";
import { ArticleCard } from "../ui/blog/article-card";
import { Newsletter } from "../ui/blog/newsletter";

const SectionContainer = styled(Container)`
  padding: 75px 0;
`;

const AllArticles = styled(Container)`
  padding: 125px 0;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 70px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Blog = () => (
  <Page
    title="The Guild Blog"
    description="Announcements about our Open-Source projects"
  >
    <Hero shrink={true}>
      <span>Blog</span>
    </Hero>
    <Section>
      <SectionContainer>
        <LastArticle
          title="Schema Change Notifications"
          description="Stay up to date with changes in your GraphQL Schema."
          image="/blog-assets/schema-change-notifications/cover.png"
          link="/blog/schema-change-notifications"
        />
      </SectionContainer>
    </Section>

    <Container>
      <Newsletter />
    </Container>

    <AllArticles>
      <ArticleCard
        title="Schema Change Notifications"
        description="Stay up to date with changes in your GraphQL Schema. Receive notifications on Slack, Discord or even via WebHooks."
        image="/blog-assets/schema-change-notifications/cover.png"
        link="/blog/schema-change-notifications"
      />
      <ArticleCard
        title="Schema Change Notifications"
        description="Stay up to date with changes in your GraphQL Schema."
        image="/blog-assets/schema-change-notifications/cover.png"
        link="/blog/schema-change-notifications"
      />
      <ArticleCard
        title="Schema Change Notifications"
        description="Stay up to date with changes in your GraphQL Schema. Receive notifications on Slack, Discord or even via WebHooks."
        image="/blog-assets/schema-change-notifications/cover.png"
        link="/blog/schema-change-notifications"
      />
    </AllArticles>
  </Page>
);

export default Blog;
