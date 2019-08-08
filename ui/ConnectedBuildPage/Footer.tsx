import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TheGuildLogo } from './Logo';
import { device } from '../media';

const Container = styled.div`
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  background-color: #050713;

  @media ${device.min.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media ${device.min.laptop} {
    padding: 50px 160px;
  }
`;

const Copyrights = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #919FB5;
  margin-top: 15px;

  @media ${device.min.tablet} {
    margin-top: 0;
    font-size: 16px;
    text-align: right;
  }
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
