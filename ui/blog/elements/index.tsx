import styled, { css } from 'styled-components';
import clsx from 'clsx';
import { GenericLink, Image } from '../../components';
import { CodeSandbox } from '../../shared/embed/CodeSandbox';
import { Gfycat } from '../../shared/embed/Gfycat';
import { StackBlitz } from '../../shared/embed/StackBlitz';
import { Tweet } from '../../shared/embed/Tweet';
import { YouTube } from '../../shared/embed/YouTube';
import { LinkPreview } from '../../shared/embed/LinkPreview';

const Ul = styled.ul.attrs(({ className }) => ({
  className: clsx('relative mb-8 list-none', className),
  css: css`
    & > li:before {
      content: '';
      position: absolute;
      left: -1.25rem;
    }
  `,
}))``;

const Blockquote = styled.blockquote.attrs(({ className }) => ({
  className: clsx(
    `
    pl-8
    my-8
    text-2xl
    italic
    font-light
    text-[#24272E]
    dark:text-[#C4C4C4]
    border-l-4
    border-l-[#7F818C]
    dark:border-l-[#C4C4C4]
    border-solid
    `,
    className
  ),
  css: css`
    & > p {
      line-height: 2.5rem;
    }
  `,
}))``;

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
  h1: ({ className, children, ...props }) => (
    <h1
      className={clsx(
        'mb-5 text-3xl font-extrabold dark:text-[#FCFCFC]',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2
      className={clsx(
        'mb-3 text-2xl font-extrabold dark:text-[#FCFCFC]',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3
      className={clsx('mb-2 font-extrabold dark:text-[#FCFCFC]', className)}
      {...props}
    >
      {children}
    </h3>
  ),
  li: ({ className, children, ...props }) => (
    <li className={clsx('mb-1.5', className)} {...props}>
      {children}
    </li>
  ),
  ul: Ul,
  ol: ({ className, children, ...props }) => (
    <ol className={clsx('mb-8', className)} {...props}>
      {children}
    </ol>
  ),
  code: Code,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  a: GenericLink,
  p: ({ className, children, ...props }) => (
    <p className={clsx('my-5 leading-[1.65]', className)} {...props}>
      {children}
    </p>
  ),
  hr: ({ className, ...props }) => (
    <hr className={clsx('my-10 border-[#24272E]', className)} {...props} />
  ),
  img: ({ className, alt, src, ...props }) => (
    <Image
      className={clsx('mx-auto block max-w-full', className)}
      src={src}
      alt={alt}
      {...props}
    />
  ),
  iframe: ({ className, children, ...props }) => (
    <iframe className={clsx('mx-auto block', className)} {...props}>
      {children}
    </iframe>
  ),
  CodeSandbox,
  Gfycat,
  StackBlitz,
  Tweet,
  YouTube,
  LinkPreview,
};
