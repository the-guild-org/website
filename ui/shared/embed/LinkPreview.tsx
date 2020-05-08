import React, { useEffect, useLayoutEffect, useState } from 'react';
import fetchPonyfill from 'fetch-ponyfill';
import styled from 'styled-components';
import { GenericLink } from '../../blog/elements/link';
import { Observer } from '../Observer';

const { fetch } = fetchPonyfill();

type PreviewData = {
  description: string;
  url: string;
  image: string;
  title: string;
} | null;

async function fetchPreview(url: string): Promise<PreviewData> {
  try {
    const result = await fetch(`/api/link-preview?url=${url}`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    return result.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}

const Container = styled.div`
  display: table;
  width: 100%;
  margin-top: 45px;
  margin-bottom: 45px;
  max-height: 280px;
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;

  &:hover {
    opacity: 0.8;
  }
`;

const TextLink = styled.a`
  background: rgba(255, 255, 255, 0);
  text-decoration: none;
  display: table-cell;
  vertical-align: middle;
  padding: 20px;

  & > strong {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-style: normal;
    font-size: 1rem;
    line-height: 1.3;
    color: var(--colors-text);
  }

  & > em {
    font-size: 0.85rem;
    font-style: normal;
    color: var(--colors-dim);
    display: block;
    max-height: 120px;
    overflow: hidden;
    word-break: break-word;
    line-height: 1.3;
  }

  @media (max-width: 640px) {
    & > strong {
      margin-bottom: 0;
    }

    & > em {
      display: none;
      visibility: hidden;
    }
  }
`;

const ImageLink = styled.a<{ image: string }>`
  display: table-cell;
  vertical-align: middle;
  width: 160px;
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${(props) => props.image});
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.09);
  border-radius: 0px 5px 5px 0px;

  @media (max-width: 640px) {
    width: 90px;
    height: 90px;
  }
`;

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

export const LinkPreview: React.FC<{ link: string }> = ({ link }) => {
  const [data, setData] = useState<PreviewData>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const fetchData = async () => {
      const previewData = await fetchPreview(link);

      setData(previewData);
    };

    fetchData();
  }, []);

  if (!data) {
    return <GenericLink href={link}>{link}</GenericLink>;
  }

  return (
    <Observer>
      <Container>
        <TextLink href={link}>
          <strong>{data.title}</strong>
          <em>{data.description}</em>
          {data.url}
        </TextLink>
        <ImageLink href={link} image={data.image} />
      </Container>
    </Observer>
  );
};
