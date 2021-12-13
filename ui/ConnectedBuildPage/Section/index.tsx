import { FC } from 'react';
import styled from 'styled-components';

import { device } from '../../media';
import { Title } from './Title';
import { useTheme } from '../theme';

const Container = styled.div<{ dark: boolean }>`
  min-height: 100vh;
  padding: 40px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) => (props.dark ? 'column-reverse' : 'column')};
  justify-content: space-around;
  background-color: ${useTheme((theme, props) =>
    props.dark ? theme.background.colors.darker : theme.background.colors.dark
  )};

  @media ${device.laptop} {
    padding: 40px 160px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > * {
      width: 35%;
    }
  }

  @media ${device.lt.laptop} {
    align-items: center;
  }
`;

type Position = 'left' | 'right';

export const Section: FC<{
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
