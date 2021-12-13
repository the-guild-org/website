import { FC } from 'react';
import styled from 'styled-components';

import { device } from '../../media';

const Container = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  padding: 0 40px;
  justify-content: center;

  @media ${device.laptop} {
    padding: 0 160px;
  }
`;

const Text = styled.div`
  font-size: 60px;
  font-weight: bold;
  line-height: 1.14;
  letter-spacing: -0.2px;
  color: ${(props) => props.theme.hero.titleColor};

  @media ${device.laptop} {
    max-width: 60%;
  }

  @media ${device.mobile} {
    font-size: 40px;
  }
`;

const ConnectedBuild = styled(Text)`
  color: ${(props) => props.theme.hero.highlightColor};
`;

export const Title: FC<{ text: string }> = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
      <ConnectedBuild>Connected Build</ConnectedBuild>
    </Container>
  );
};
