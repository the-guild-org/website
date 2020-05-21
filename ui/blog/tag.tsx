import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';

const TagContainer = styled.span`
  display: inline-block;
  padding: 0.3rem;
  margin-right: 8px;
  margin-bottom: 8px;
  background-color: #f1f1f1;
  border-radius: 0.3rem;
  font-size: 0.7rem;
  color: var(--colors-dim);
`;

const Link = styled(NativeLink)`
  color: var(--colors-dim);
  font-size: 0.8rem;

  &:hover {
    opacity: var(--hover-opacity);
  }
`;

export const Tag: React.FC<{
  tag: string;
  asLink: boolean;
}> = ({ tag, asLink }) => {
  return (
    <TagContainer>
      {asLink ? (
        <Link href={`/blog/tag/${tag}`} as="a">
          {tag}
        </Link>
      ) : (
        tag
      )}
    </TagContainer>
  );
};
