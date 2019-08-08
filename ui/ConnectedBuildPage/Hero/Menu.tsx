import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { MessageSquare } from 'react-feather';

import { TheGuildLogo } from '../Logo';
import { useScrollTo } from '../../../hooks/use-scroll-to';

const Container = styled.div`
  display: flex;
  padding: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const LetsTalk = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const MenuLink = styled.a`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.bar.textColor};
  margin-left: 30px;
`;

export const Menu: React.FunctionComponent = () => {
  const scrollTo = useScrollTo();

  return (
    <Container>
      <Link href='/'>
        <a>
          <TheGuildLogo />
        </a>
      </Link>
      <LetsTalk
        onClick={e => {
          e.preventDefault();
          scrollTo('section-contact');
        }}
      >
        <MenuLink>Let's talk</MenuLink>
        <MenuLink>
          <MessageSquare />
        </MenuLink>
      </LetsTalk>
    </Container>
  );
};
