import { FC } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { GlobalStyles, Header, FooterExtended } from '@theguild/components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 960px) {
    margin: 0 15px;
  }
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

export const Layout: FC = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <GlobalStyles includeFonts={false} />
      <Header
        activeLink={router.asPath}
        accentColor="var(--colors-accent)"
        themeSwitch
        linkProps={{
          onClick(e) {
            const { href } = e.currentTarget;
            if (href) {
              const { pathname } = new URL(href);
              router.push(pathname);
            }
          },
        }}
      />
      {children}
      <div
        css={css`
          // TODO: FIX guild/components - Input style is broken, need to reset default style for newsletter input 🤷‍
          input {
            border: 0;
            // font is also broken, he is set up as Arial 🤷‍
            font-family: TGCFont, sans-serif;
          }

          button[type='submit'] {
            border: 0;

            &:hover {
              cursor: pointer;
            }
          }
        `}
      >
        <FooterExtended
          sameSite
          resources={[
            {
              children: 'Blog',
              title: 'Blog',
              href: '/blog',
              onClick(e) {
                e.preventDefault();
                router.push('/blog');
              },
            },
            {
              children: 'Services',
              title: 'Services',
              href: '/services',
              onClick(e) {
                e.preventDefault();
                router.push('/services');
              },
            },
          ]}
          // TODO: Add me in the future as is it in mockup
          // onNewsletterSubmit={(e, email) => {
          //   console.log({ email })
          // }}
        />
      </div>
    </>
  );
};

export const Section = styled.section<{ noNotch?: boolean; light?: boolean }>`
  position: relative;
  background-color: ${(props) => (props.light ? 'transparent' : '#16171c')};
  color: var(--colors-primary);

  ${(props) =>
    props.noNotch
      ? ''
      : css`
        &::before {
          content: '';
          position: absolute;
          top: -40px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 40px 40px 40px;
          border-color: transparent transparent
            ${props.light ? '#fff' : '#16171c'} transparent;
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

export const Hero: FC<{ shrink?: boolean }> = ({ shrink, children }) => {
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

export const Arrow: FC<{ className?: string }> = ({ className }) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
