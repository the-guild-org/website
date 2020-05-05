import React from "react";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import styled from "styled-components";
import format from "date-fns/format";
import { components, H1 } from "./elements";
import { Layout } from "../shared/Layout";
import { Newsletter } from "./newsletter";
import { Page } from "../shared/Page";

interface Meta {
  title: string;
  tags: string[];
  date: string;
  description: string;
  image: string;
}

const Container = styled.div`
  max-width: 690px;
  margin: 0 auto;
`;

const Main = styled.main`
  padding: 125px 15px;
`;

const Content = styled.div`
  padding-top: 75px;
  font-family: "PT Serif", serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: #292929;
  line-height: 2rem;
`;

const Title = styled(H1)``;

const Details = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Time = styled.time`
  color: #777;
  font-size: 0.8rem;
`;

const Cover = styled.img`
  padding-top: 75px;
  margin: 0 auto;
  width: 100%;
  height: auto;
`;

export default (meta: Meta): React.FC => {
  return ({ children: content }) => {
    const title = `${meta.title} - The Guild Blog`;
    const date = meta.date ? new Date(meta.date) : new Date();

    return (
      <MDXProvider components={components}>
        <Page title={title} image={meta.image} description={meta.description}>
          <Container>
            <Main>
              <Title>{meta.title}</Title>
              <Details>
                <Time dateTime={date.toString()}>
                  {format(date, "EEEE, LLL do y")}
                </Time>
              </Details>
              <Cover src={meta.image} alt={title} />
              <Content>{content}</Content>
              <Newsletter />
            </Main>
          </Container>
        </Page>
      </MDXProvider>
    );
  };
};
