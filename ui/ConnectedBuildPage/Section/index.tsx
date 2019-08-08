import React from 'react';
import styled from 'styled-components';

import { Title } from './Title';

const Container = styled.div<{ dark: boolean }>`
  height: 100vh;
  padding: 0 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.dark ? '#0d1126' : '#0b0b17')};

  & > * {
    width: 35%;
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
