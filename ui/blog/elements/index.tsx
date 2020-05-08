import styled from 'styled-components';
import { Code, InlineCode } from './code';
import { GenericLink } from './link';
import { CodeSandbox } from '../../shared/embed/CodeSandbox';
import { StackBlitz } from '../../shared/embed/StackBlitz';
import { Tweet } from '../../shared/embed/Tweet';
import { YouTube } from '../../shared/embed/YouTube';
import { LinkPreview } from '../../shared/embed/LinkPreview';

const H1 = styled.h2`
  text-align: left;
  margin-top: 2.5rem;
  font-size: 2rem;
  color: var(--colors-primary);
  font-family: 'Roboto', sans-serif;
`;

const H2 = styled.h3`
  margin-top: 2.5rem;
  font-size: 1.5rem;
  color: var(--colors-primary);
  font-family: 'Roboto', sans-serif;
`;

const H3 = styled.h4`
  margin-top: 2.5rem;
  font-size: 1.2rem;
  color: var(--colors-primary);
  font-family: 'Roboto', sans-serif;
`;

const P = styled.p`
  line-height: 2rem;
  margin-bottom: 2rem;
`;

const Ul = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

const Li = styled.li`
  margin-bottom: 0.35rem;

  &:before {
    content: '-';
    display: inline-block;
    color: #6d6d6d;
    position: absolute;
    margin-left: -25px;
  }
`;

const Blockquote = styled.blockquote`
  margin: 2rem 0;
  padding-left: 3rem;
  color: var(--colors-dim);
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;

  & > p {
    line-height: 2.5rem;
  }
`;

const Hr = () => (
  <div>
    <hr />
    <style jsx>{`
      hr {
        margin: 4rem 0;
        border: none;
        border-bottom: 1px solid #eee;
      }
    `}</style>
  </div>
);

const Img = styled.img.attrs((props) => ({
  ...props,
  alt: props.alt || '',
}))`
  display: block;
  max-width: 100%;
  margin: 0 auto;
`;

const Iframe = styled.iframe`
  display: block;
  margin: 0 auto;
`;

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  li: Li,
  ul: Ul,
  code: Code,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  a: GenericLink,
  p: P,
  hr: Hr,
  img: Img,
  iframe: Iframe,
  CodeSandbox,
  StackBlitz,
  Tweet,
  YouTube,
  LinkPreview,
};
