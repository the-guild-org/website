import styled from 'styled-components';
import clsx from 'clsx';
import { GenericLink, Image } from '../../components';
import { CodeSandbox } from '../../shared/embed/CodeSandbox';
import { Gfycat } from '../../shared/embed/Gfycat';
import { StackBlitz } from '../../shared/embed/StackBlitz';
import { Tweet } from '../../shared/embed/Tweet';
import { YouTube } from '../../shared/embed/YouTube';
import { LinkPreview } from '../../shared/embed/LinkPreview';

const Ul = styled.ul`
  ${tw`relative mb-8 list-none`}
  & > li:before {
    ${tw`content-['–'] absolute -left-5`}
  }
`;

const Blockquote = styled.blockquote`
  ${tw`
    italic text-2xl pl-8 my-8 font-light
    text-[#24272E] dark:text-[#C4C4C4]
    border-l-4 border-solid border-l-[#7F818C] dark:border-l-[#C4C4C4]
  `}
  & > p {
    line-height: 2.5rem;
  }
`;

const Img = styled(Image).attrs((props) => ({
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

const Code = styled.pre.attrs<{ syntax?: string }>(({ syntax }) => ({
  className: syntax ? ` ${syntax}` : '',
}))`
  background: #1d1f21;
  color: #f8f8f2;
  overflow: auto;
  padding: 1.5rem;
  border-radius: 3px;
  -webkit-overflow-scrolling: touch;
  font-size: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
  letter-spacing: 0;
  font-weight: 400;
  line-height: 1.4;
`;

const InlineCode = styled.code.attrs<{ wrap?: boolean }>(({ wrap }) => ({
  className: wrap ? 'wrap' : '',
}))`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;

  font-family: Monaco, Consolas, 'Andale  Mono', 'DejaVu Sans Mono', monospace;
`;

export const components = {
  h1: tw.h1`text-3xl dark:text-[#FCFCFC] font-extrabold mb-5`,
  h2: tw.h2`text-2xl dark:text-[#FCFCFC] font-extrabold mb-3`,
  h3: tw.h3`dark:text-[#FCFCFC] font-extrabold mb-2`,
  li: tw.li`mb-1.5`,
  ul: Ul,
  ol: tw.ol`mb-8`,
  code: Code,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  a: GenericLink,
  p: tw.p`leading-[1.65] my-5`,
  hr: tw.hr`border-[#24272E] my-10`,
  img: Img,
  iframe: Iframe,
  CodeSandbox,
  Gfycat,
  StackBlitz,
  Tweet,
  YouTube,
  LinkPreview,
};
