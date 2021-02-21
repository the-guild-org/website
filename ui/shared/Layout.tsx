import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GitHub, Linkedin, Twitter, Youtube } from 'react-feather';
import styled from 'styled-components';
// import { TheGuildLogo } from './Logo';
import { HeaderLogo } from './HeaderLogo';
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

const Header = styled.header<{ sticky?: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => (props.sticky ? 'backdrop-filter: blur(5px);' : '')}

  background-color: white;

  /* background-color: ${(props) =>
    props.sticky ? 'rgba(255, 255, 255, 0.9)' : 'transparent'}; */
  box-sizing: border-box;
  z-index: 1;

  box-shadow: ${(props) =>
    props.sticky ? 'rgba(0, 0, 0, 0.05) 0px 0px 15px 0px' : 'none'};

  transition: all 0.5s ease 0s;

  @media (max-width: 640px) {
    padding: 15px;
    flex-direction: column;

    & > *:first-child {
      margin-bottom: 15px;
    }
  }
`;

const StyledInput = styled.div`
  svg {
    position: absolute;
    left: 0;
    top: 8px;
    padding: 9px 8px;
    fill: black;
    transition: 0.3s;
  }

  input:focus + svg {
    fill: dodgerBlue;
  }

  &.inputWithIcon {
    position: relative;
  }
`;

const SearchInput = styled.input`
  font-size: 15px;
  font-weight: 300;
  border-radius: 5px;
  margin-left: 10px;
  padding-left: 20px;

  &::placeholder {
    color: #334664;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  & > a {
    margin-left: 25px;
    color: var(--colors-primary);
    font-weight: 500;
  }

  & > a:hover {
    text-decoration: none;
    color: var(--colors-accent);
  }
`;

const Logo = styled.div`
  height: 34px;
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
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.18);
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  const [sticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = useCallback(() => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top < 0);
    }
  }, [ref.current, setSticky]);

  useEffect(() => {
    if (typeof window === 'object') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', () => handleScroll);
      };
    }
  }, []);

  return (
    <Wrapper ref={ref}>
      <Header sticky={sticky}>
        <Logo>
          <Link href="/">
            <a title="The Guild - home page">
              <HeaderLogo />
            </a>
          </Link>
        </Logo>
        <Nav>
          <Link href="/services">
            <a title="The Guild - Our Services">Our Services</a>
          </Link>
          <Link href="/blog">
            <a title="The Guild - Blog">Blog</a>
          </Link>
          <Link href="/open-source">
            <a title="The Guild - Open Source projects">Open Source</a>
          </Link>
          <Link href="/about-us">
            <a title="The Guild - About Us">About Us</a>
          </Link>
          <Link href="/contact">
            <a title="The Guild - Contact us">Contact</a>
          </Link>

          <StyledInput className={'inputWithIcon'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="10px"
              height="10px"
              style={{
                padding: '0px',
                left: '20px',
                zIndex: 10,
              }}
            >
              <path d="M 13.261719 14.867188 L 15.742188 17.347656 C 15.363281 18.070313 15.324219 18.789063 15.722656 19.1875 L 20.25 23.714844 C 20.820313 24.285156 22.0625 23.972656 23.015625 23.015625 C 23.972656 22.058594 24.285156 20.820313 23.714844 20.25 L 19.191406 15.722656 C 18.789063 15.324219 18.070313 15.363281 17.347656 15.738281 L 14.867188 13.261719 Z M 8.5 0 C 3.804688 0 0 3.804688 0 8.5 C 0 13.195313 3.804688 17 8.5 17 C 13.195313 17 17 13.195313 17 8.5 C 17 3.804688 13.195313 0 8.5 0 Z M 8.5 15 C 4.910156 15 2 12.089844 2 8.5 C 2 4.910156 4.910156 2 8.5 2 C 12.089844 2 15 4.910156 15 8.5 C 15 12.089844 12.089844 15 8.5 15 Z" />
            </svg>
            <SearchInput
              type="text"
              id="headerSearchBox"
              placeholder="Search all our projects"
            />
          </StyledInput>
        </Nav>
      </Header>
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
