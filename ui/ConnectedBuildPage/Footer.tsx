import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TheGuildLogo } from './Logo';

const Container = styled.div`
  padding: 50px 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #050713;
`;

const Copyrights = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: 300;
  color: #354969;
`;

export const Footer: React.FunctionComponent = () => {
  return (
    <Container>
      <Link href='/'>
        <a>
          <TheGuildLogo />
        </a>
      </Link>
      <Copyrights>&copy; 2019 Connected Build by The Guild ltd.</Copyrights>
    </Container>
  );
};
