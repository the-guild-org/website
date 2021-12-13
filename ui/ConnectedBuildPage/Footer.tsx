import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { TheGuildLogo } from '../shared/Logo';
import { device } from '../media';
import { getFontColor } from './theme';

const Container = styled.div`
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  background-color: #050713;

  @media ${device.gt.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media ${device.laptop} {
    padding: 50px 160px;
  }
`;

const Copyrights = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: ${getFontColor('light')};
  margin-top: 15px;

  @media ${device.gt.tablet} {
    margin-top: 0;
    font-size: 16px;
    text-align: right;
  }
`;

export const Footer: FC = () => {
  return (
    <Container>
      <Link href="/">
        <a>
          <TheGuildLogo />
        </a>
      </Link>
      <Copyrights>&copy; 2019 Connected Build by The Guild ltd.</Copyrights>
    </Container>
  );
};
