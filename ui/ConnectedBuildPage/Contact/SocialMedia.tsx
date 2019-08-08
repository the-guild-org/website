import React from 'react';
import styled from 'styled-components';
import { GitHub, Twitter, Slack } from 'react-feather';

const SocialMediaName = styled.div``;

const SocialMedia = styled.a`
  display: flex;
  margin: 5px 0;
  justify-content: flex-start;
  align-items: center;
  color: #354969;
  text-decoration: none;

  &:hover {
    color: #4d6894;

    ${SocialMediaName} {
      color: #4d6894;
    }
  }

  ${SocialMediaName} {
    padding-left: 10px;
    font-size: 15px;
    font-weight: 300;
    color: #354969;
  }
`;

export const SocialMedias: React.FunctionComponent = () => {
  return (
    <>
      <SocialMedia href=''>
        <GitHub />
        <SocialMediaName>GitHub</SocialMediaName>
      </SocialMedia>
      <SocialMedia href=''>
        <Twitter />
        <SocialMediaName>Twitter</SocialMediaName>
      </SocialMedia>
      <SocialMedia href=''>
        <Slack />
        <SocialMediaName>Slack</SocialMediaName>
      </SocialMedia>
    </>
  );
};
