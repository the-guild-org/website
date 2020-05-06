import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';
import format from 'date-fns/format';
import LazyLoad from 'react-lazyload';
import { withPlaceholder } from '../../lib/images';

const Link = styled(NativeLink)`
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.75;
  }
`;

const Cover = styled.div<{ src: string; isPlaceholder?: boolean }>`
  display: block;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;

  & > * {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.src});
    ${(props) => (props.isPlaceholder ? 'filter: blur(5px);' : '')}
  }
`;

const Placeholder = styled.div`
  display: block;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const Content = styled.div`
  padding: 1rem 1.5rem;
`;

const Title = styled.h3`
  color: var(--colors-text);
`;

const Description = styled.p`
  color: var(--colors-dim);
`;

const Time = styled.time`
  color: var(--colors-dim);
  font-size: 0.8rem;
`;

export const ArticleCard: React.FC<{
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}> = ({ title, description, image, link, date: rawDate }) => {
  const date = new Date(rawDate);
  const { large, placeholder, hasPlaceholder } = withPlaceholder(image);

  return (
    <Link href={link} as="a" title={title}>
      <LazyLoad
        height={150}
        once
        offset={300}
        placeholder={
          hasPlaceholder ? (
            <Cover src={placeholder} isPlaceholder={hasPlaceholder}>
              <div />
            </Cover>
          ) : (
            <Placeholder />
          )
        }
        debounce={500}
      >
        <Cover src={large} isPlaceholder={false}>
          <div />
        </Cover>
      </LazyLoad>
      <Content>
        <Time dateTime={date.toString()}>{format(date, 'EEEE, LLL do y')}</Time>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Link>
  );
};
