import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { Image } from '../blog/image';
import { components } from '../blog/elements';
import { Newsletter } from '../blog/newsletter';
import { Page } from '../shared/Page';
import { GenericLink } from '../blog/elements/link';

const Container = styled.div`
  max-width: 690px;
  margin: 0 auto;
`;

const Main = styled.article`
  padding: 125px 15px;
`;

const Content = styled.div`
  padding-top: 25px;
  font-family: 'PT Serif', serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--colors-text);
  line-height: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  font-size: 2rem;
  color: var(--colors-primary);
`;

const ConsultingInfo = styled.div`
  margin-top: 25px;
  padding: 25px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2rem;
  font-family: 'PT Serif', serif;
  color: var(--colors-dim);
  background-color: #f7f7f7;
  border-left: 3px solid var(--colors-accent);
`;

const Cover = styled.div`
  padding-top: 25px;
  margin: 0 auto;
  width: 100%;
  height: auto;

  & > * {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }
`;

const NewsletterPage = (meta: { title: string }): React.FC => {
  return function NewsletterRender({ children: content }) {
    const title = `${meta.title} - The Guild Newsletter`;
    return (
      <MDXProvider components={components}>
        <Page title={title} description={`A newsletter`}>
          <Container>
            <Main>
              <Title>{meta.title}</Title>
              <Cover>
                <Image
                  src={`https://the-guild-og-image.vercel.app/**Beyond**%20GraphQL.png?theme=light&md=1&fontSize=100px&images=https://www.graphql-mesh.com/img/mesh-text-logo.svg&images=https%3A%2F%2Fgraphql-hive.com%2Flogo.svg&widths=auto&widths=380`}
                  alt={title}
                />
              </Cover>
              {/* https://the-guild-og-image.vercel.app/**Beyond**%20GraphQL.png?theme=light&md=1&fontSize=100px&images=https://www.graphql-mesh.com/img/mesh-text-logo.svg&images=https%3A%2F%2Fgraphql-hive.com%2Flogo.svg&widths=auto&widths=380 */}
              <ConsultingInfo>
                Looking for experts? We offer consulting and trainings.
                <br />
                Explore{' '}
                <GenericLink
                  href="/services"
                  title="Explore our services. Consulting and Trainings."
                >
                  our services
                </GenericLink>{' '}
                and get in touch.
              </ConsultingInfo>
              <Content>{content}</Content>
              <Newsletter />
            </Main>
          </Container>
        </Page>
      </MDXProvider>
    );
  };
};

export default NewsletterPage;
