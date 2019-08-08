import React, { useMemo } from 'react';
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

const TitleText = styled.span`
  font-size: 60px;
  font-weight: bold;
  line-height: 1.14;
  letter-spacing: -0.2px;
  color: ${props => props.theme.hero.titleColor};
`;

const HighlightText = styled(TitleText)`
  color: ${props => props.theme.hero.highlightColor};
`;

const TitleContainer = styled.div`
  margin: 15px 0;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 300;
  color: #354969;
`;

export const Title: React.FunctionComponent<{
  subtitle: string;
  title: string;
  highlight: string;
  description: string;
}> = ({ subtitle, description, title, highlight }) => {
  const [before, middle, after] = useMemo(() => {
    const start = title.indexOf(highlight);
    const end = start + highlight.length;

    return [title.substr(0, start), highlight, title.substr(end)];
  }, [title, highlight]);

  return (
    <Container>
      <Subtitle>{subtitle}</Subtitle>
      <TitleContainer>
        <TitleText>{before}</TitleText>
        <HighlightText>{middle}</HighlightText>
        <TitleText>{after}</TitleText>
      </TitleContainer>
      <Text>{description}</Text>
    </Container>
  );
};
