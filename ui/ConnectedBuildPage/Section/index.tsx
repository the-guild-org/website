import React from 'react';
import styled from 'styled-components';

import { device } from '../../media';
import { Title } from './Title';

const Container = styled.div<{ dark: boolean }>`
  min-height: 100vh;
  padding: 40px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.dark ? 'column-reverse' : 'column'};
  justify-content: space-around;
  background-color: ${props => (props.dark ? '#0d1126' : '#0b0b17')};

  @media ${device.min.laptop} {
    padding: 40px 160px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    & > * {
      width: 35%;
    }
  }
`;

type Position = 'left' | 'right';

export const Section: React.FunctionComponent<{
  anchor: string;
  subtitle: string;
  title: string;
  highlight: string;
  description: string;
  on: Position;
  className?: string;
}> = ({
  className,
  on,
  subtitle,
  title,
  highlight,
  description,
  children,
  anchor,
}) => {
  const titleElement = (
    <Title
      subtitle={subtitle}
      title={title}
      highlight={highlight}
      description={description}
    />
  );

  return (
    <Container
      dark={on === 'right'}
      className={className}
      id={`section-${anchor}`}
    >
      {on === 'left' && titleElement}
      {children}
      {on === 'right' && titleElement}
    </Container>
  );
};
