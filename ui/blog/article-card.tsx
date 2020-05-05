import React from "react";
import styled from "styled-components";
import NativeLink from "next/link";

const Link = styled(NativeLink)`
  box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1);
  border-radius: 0.5rem;

  &:hover {
    opacity: 0.75;
  }
`;

const Cover = styled.img`
  max-width: 100%;
  height: 150px;
  object-position: center;
  object-fit: cover;
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

export const ArticleCard: React.FC<{
  title: string;
  description: string;
  image: string;
  link: string;
}> = ({ title, description, image, link }) => {
  return (
    <Link href={link} as="a" title={title}>
      <Cover src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Link>
  );
};
