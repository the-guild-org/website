import React from 'react';
import styled from 'styled-components';
import NativeLink from 'next/link';

const TagContainer = styled.span`
  border-radius: 5px;
  background-color: #f1f1f1;
  padding: 4px;
  margin-right: 8px;
  font-size: 12px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  display: inline-block;
`;

const Link = styled(NativeLink)`
  color: var(--colors-dim);
  font-size: 0.8rem;

  &:hover {
    opacity: 0.6;
  }
`;

export const Tag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <TagContainer>
      <Link href={`/blog/tag/${tag}`} as="a">
        {tag}
      </Link>
    </TagContainer>
  );
};
