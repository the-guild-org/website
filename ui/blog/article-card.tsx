import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';
import format from 'date-fns/format';

const Link = styled(NativeLink)`
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.75;
  }
`;

const Cover = styled.div<{ src: string }>`
  display: block;
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.src});
  border-radius: 0.5rem 0.5rem 0 0;
`;

const Content = styled.div`
  padding: 1rem 1.5rem;
`;

const Title = styled.h3`
  color: #292929;
`;

const Description = styled.p`
  color: #777;
`;

const Time = styled.time`
  color: #777;
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

  return (
    <Link href={link} as="a" title={title}>
      <Cover src={image} />
      <Content>
        <Time dateTime={date.toString()}>{format(date, 'EEEE, LLL do y')}</Time>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Link>
  );
};
