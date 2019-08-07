import React from 'react';
import styled from 'styled-components';
import { MessageSquare } from 'react-feather';

import { TheGuildLogo } from '../Logo';

const Container = styled.div`
  display: flex;
  padding: 20px 40px;
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Link = styled.a`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.bar.textColor};
  margin-left: 30px;
`;

export const Menu: React.FunctionComponent = () => {
  return (
    <Container>
      <TheGuildLogo />
      <LeftMenu>
        <Link>Let's talk</Link>
        <Link>
          <MessageSquare />
        </Link>
      </LeftMenu>
    </Container>
  );
};
