import React from 'react';
import styled from 'styled-components';
import { GitHub, Twitter, Slack } from 'react-feather';
import { getFontColor } from '../theme';

const SocialMediaName = styled.div``;

const SocialMedia = styled.a`
  display: flex;
  margin: 5px 0;
  justify-content: flex-start;
  align-items: center;
  color: ${getFontColor('light')};
  text-decoration: none;

  &:hover {
    color: ${getFontColor('dim')};

    ${SocialMediaName} {
      color: ${getFontColor('dim')};
    }
  }

  ${SocialMediaName} {
    padding-left: 10px;
    font-size: 15px;
    font-weight: 300;
    color: ${getFontColor('light')};
  }
`;

export const SocialMedias: React.FunctionComponent = () => {
  return (
    <>
      <SocialMedia href="https://github.com/the-guild-org">
        <GitHub />
        <SocialMediaName>GitHub</SocialMediaName>
      </SocialMedia>
      <SocialMedia href="https://twitter.com/TheGuildDev">
        <Twitter />
        <SocialMediaName>Twitter</SocialMediaName>
      </SocialMedia>
      <SocialMedia href="https://github.com/urigo">
        <Slack />
        <SocialMediaName>Slack</SocialMediaName>
      </SocialMedia>
    </>
  );
};
