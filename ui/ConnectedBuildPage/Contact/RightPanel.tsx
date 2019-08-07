import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #354969;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const TitleText = styled.div`
  font-size: 60px;
  font-weight: bold;
  line-height: 1.14;
  letter-spacing: -0.2px;
  color: ${props => props.theme.hero.titleColor};
`;

const Highlight = styled(TitleText)`
  color: ${props => props.theme.hero.highlightColor};
`;

const Title = styled.div`
  margin: 15px 0;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: #354969;
`;

export const RightPanel: React.FunctionComponent = () => {
  return (
    <Container>
      <Subtitle>Join the revolution</Subtitle>
      <Title>
        <TitleText>Think Your</TitleText>
        <Highlight>Open Source</Highlight>
        <TitleText>Maintainer?</TitleText>
      </Title>
      <Text>
        Get work and real money for your work instead of relaying on charity.
      </Text>
    </Container>
  );
};
