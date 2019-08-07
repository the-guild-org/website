import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  padding: 0 160px;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 60px;
  font-weight: bold;
  line-height: 1.14;
  letter-spacing: -0.2px;
  color: ${props => props.theme.hero.titleColor};
  max-width: 60%;
`;

const ConnectedBuild = styled(Text)`
  color: ${props => props.theme.hero.highlightColor};
`;

export const Title: React.FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
      <ConnectedBuild>Connected Build</ConnectedBuild>
    </Container>
  );
};
