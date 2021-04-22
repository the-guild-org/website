import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Header } from 'the-guild-components';
import { GitHub, Twitter, Linkedin, Youtube } from 'react-feather';

import { Discord } from './logos/Discord';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 960px) {
    margin: 0 15px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Button = styled.button`
  width: auto;
  height: auto;
  padding: 0.75rem 1.5rem;
  transition-duration: 0.15s;
  color: #fff;
  line-height: 1.375;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  background-color: var(--colors-accent);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  /* 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: var(--colors-accent-light);
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    opacity: var(--hover-opacity);
    cursor: progress;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 35px 0;
  background-color: #262f3f;
`;

const FooterText = styled.div`
  padding: 15px 0;
  text-align: center;
  color: #b9bec6;
  font-size: 12px;
`;

const FooterLinks = styled.div`
  display: flex;
  padding: 15px 0;
  max-width: 960px;
  margin: 0 auto;
  justify-content: center;

  & > a {
    color: #b9bec6;
    margin: 0 20px;
  }

  & > a:hover {
    color: #fff;
  }
`;

export const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Header
        sameSite
        activeLink={router.asPath}
        accentColor="var(--colors-accent)"
      />
      {children}
      <Footer>
        <FooterLinks>
          <Link href="/services">
            <a title="Work with us">Our Services</a>
          </Link>
          <Link href="/blog">
            <a title="Read our blog">Blog</a>
          </Link>
          <Link href="/open-source">
            <a title="Explore our projects">Open Source</a>
          </Link>
          <a
            href="https://github.com/the-guild-org/community-meetings"
            title="Join our Community Meetings"
          >
            Community Meetings
          </a>
          <Link href="/contact">
            <a title="Get in touch">Contact</a>
          </Link>
        </FooterLinks>

        <FooterLinks>
          <a
            href="https://github.com/the-guild-org"
            title="See our GitHub profile"
          >
            <GitHub />
          </a>
          <a href="https://twitter.com/TheGuildDev" title="Visit our Twitter">
            <Twitter />
          </a>
          <a
            href="https://www.youtube.com/watch?v=DWBL7GLMVsY&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd"
            title="Visit our YouTube channel"
          >
            <Youtube />
          </a>
          <a
            href="https://www.linkedin.com/company/the-guild-software"
            title="Visit our LinkedIn"
          >
            <Linkedin />
          </a>
          <a href="https://the-guild.dev/discord" title="Visit our Discord">
            <Discord />
          </a>
        </FooterLinks>

        <FooterText>
          © {new Date().getFullYear()} The Guild, All Rights Reserved
        </FooterText>
      </Footer>
    </Wrapper>
  );
};

export const Section = styled.section<{ noNotch?: boolean; light?: boolean }>`
  position: relative;
  background-color: ${(props) => (props.light ? '#fff' : '#f1f1f1')};
  color: var(--colors-primary);

  ${(props) =>
    props.noNotch
      ? ''
      : `
      &::before {
        content: '';
        position: absolute;
        top: -40px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 40px 40px 40px;
        border-color: transparent transparent ${
          props.light ? '#fff' : '#f1f1f1'
        } transparent;
        left: 50%;
        transform: translateX(-50%);
      }
    `}
`;

const HeroContainer = styled.div<{ shrink?: boolean }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${(props) => (props.shrink ? '50vh' : '100vh')};
  min-height: 300px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(/img/tiles-lb.png);
    background-position: left bottom;
    background-repeat: no-repeat;
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(/img/tiles-lb.png);
    background-position: left bottom;
    background-repeat: no-repeat;
    transform: rotate(-180deg);
    z-index: -2;
  }
`;

const HeroHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--colors-primary);

  span {
    color: var(--colors-accent);
  }

  & > h1 {
    display: block;
    font-size: 34px;
  }
`;

const FullContainer = styled(Container)`
  height: 100%;
`;

export const Hero: React.FC<{ shrink?: boolean }> = ({ shrink, children }) => {
  return (
    <HeroContainer shrink={shrink}>
      <FullContainer>
        <HeroHeader>
          <h1>{children}</h1>
        </HeroHeader>
      </FullContainer>
    </HeroContainer>
  );
};

export const Arrow: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};
