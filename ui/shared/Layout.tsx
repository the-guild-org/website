import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { GitHub, Twitter, Linkedin } from "react-feather";
import { TheGuildLogo } from "./Logo";

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.9);

  box-sizing: border-box;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  & > a {
    margin-left: 25px;
    color: #000;
    font-weight: 500;
  }

  & > a:hover {
    text-decoration: underline;
  }
`;

const Logo = styled.div`
  height: 34px;
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
  return (
    <>
      <Header>
        <Logo>
          <Link href="/">
            <a title="The Guild - home page">
              <TheGuildLogo />
            </a>
          </Link>
        </Logo>
        <Nav>
          <Link href="/blog">
            <a title="The Guild - Blog">Blog</a>
          </Link>
          <Link href="/contact">
            <a title="The Guild - Contact us">Contact</a>
          </Link>
        </Nav>
      </Header>
      {children}
      <Footer>
        <FooterLinks>
          <Link href="/blog">
            <a title="Read our blog">Blog</a>
          </Link>
          <Link href="/projects">
            <a title="Explore our projects">Projects</a>
          </Link>
          <Link href="/contact">
            <a title="Get in touch">Contact</a>
          </Link>
        </FooterLinks>

        <FooterLinks>
          <Link href="">
            <a title="See our GitHub profile">
              <GitHub />
            </a>
          </Link>
          <Link href="">
            <a title="Visit our Twitter">
              <Twitter />
            </a>
          </Link>
          <Link href="">
            <a title="Visit our LinkedIn">
              <Linkedin />
            </a>
          </Link>
        </FooterLinks>

        <FooterText>
          © {new Date().getFullYear()} The Guild, All Rights Reserved
        </FooterText>
      </Footer>
    </>
  );
};

export const Section = styled.section`
  background: #000;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 40px 40px 40px;
    border-color: transparent transparent #000 transparent;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const FirstBackground = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url(/img/tiles-lb.png);
  background-position: left bottom;
  background-repeat: no-repeat;
`;

const SecondBackground = styled.div`
  width: 100%;
  height: 100vh;

  background-image: url(/img/tiles-rt.png);
  background-position: right top;
  background-repeat: no-repeat;
`;

const HeroHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #777;

  span {
    color: #000;
  }

  & > h1 {
    display: block;
    font-size: 34px;
  }
`;

export const Hero: React.FC = ({ children }) => {
  return (
    <HeroContainer>
      <FirstBackground>
        <SecondBackground>
          <Container>
            <HeroHeader>
              <h1>{children}</h1>
            </HeroHeader>
          </Container>
        </SecondBackground>
      </FirstBackground>
    </HeroContainer>
  );
};
