import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';

const Title = styled.h2`
  color: var(--colors-text);
`;

const Description = styled.p`
  color: var(--colors-dim);
`;

const Link = styled(NativeLink)`
  &:hover > * {
    opacity: 0.75;
  }
`;

const Cover = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: flex;

  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;

    & > *:last-child {
      max-width: 50%;
      margin: 25px auto 0 auto;
    }
  }

  @media (min-width: 640px) {
    & > *:first-child {
      width: 70%;
      margin: 0 auto;
    }

    & > *:last-child {
      max-width: 50%;
      margin: 25px auto 0 auto;
    }
  }

  @media (max-width: 640px) {
    & > *:first-child {
      width: 70%;
      margin: 0 auto;
    }

    & > *:last-child {
      max-width: 70%;
      margin: 25px auto 0 auto;
    }
  }

  @media (min-width: 961px) {
    align-items: center;
    justify-content: space-between;

    & > *:first-child {
      width: 40%;
    }

    & > *:last-child {
      width: 50%;
    }
  }
`;

export const LastArticle: React.FC<{
  title: string;
  description: string;
  image: string;
  link: string;
}> = ({ title, description, image, link }) => {
  return (
    <Container>
      <Link href={link} as="a" title={title}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Link>
      <Link href={link} as="a" title={title}>
        <Cover src={image} />
      </Link>
    </Container>
  );
};
