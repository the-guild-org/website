import clsx from 'clsx';
import { css, styled } from '../../../stitches.config';
import { GenericLink, Image } from '../../components';
import { CodeSandbox } from '../../shared/embed/CodeSandbox';
import { Gfycat } from '../../shared/embed/Gfycat';
import { StackBlitz } from '../../shared/embed/StackBlitz';
import { Tweet } from '../../shared/embed/Tweet';
import { YouTube } from '../../shared/embed/YouTube';
import { LinkPreview } from '../../shared/embed/LinkPreview';

const Ul = styled('ul', {});
const Blockquote = styled('blockquote', {});
const Code = styled('code', {});
const InlineCode = styled('code', {});

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
  ul: ({ className, children, ...props }) => (
    <Ul
      className={clsx('relative mb-8 list-none', className)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TODO: find a way to fix type error
      // @ts-ignore
      css={css({
        '& > li:before': {
          content: '',
          position: 'absolute',
          left: '-1.25rem',
        },
      })}
      {...props}
    >
      {children}
    </Ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol className={clsx('mb-8', className)} {...props}>
      {children}
    </ol>
  ),
  pre: styled('pre', {
    background: '#1d1f21',
    borderRadius: 4,
    padding: 24,
    color: '#f8f8f2',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  }),
  code: ({ className, syntax, children, ...props }) => (
    <Code
      className={clsx('', syntax, className)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TODO: find a way to fix type error
      // @ts-ignore
      css={css({
        background: '#1d1f21',
        overflow: 'auto',
        borderRadius: 3,
        '-webkit-overflow-scrolling': 'touch',
        fontSize: '1rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        letterSpacing: 0,
        fontWeight: 400,
        lineHeight: 1.4,
      })}
      {...props}
    >
      {children}
    </Code>
  ),
  inlineCode: ({ className, wrap, children, ...props }) => (
    <InlineCode
      className={clsx(
        'rounded-[5px] border border-solid border-gray-500/20 px-1 py-0.5',
        wrap && 'wrap',
        className
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TODO: find a way to fix type error
      // @ts-ignore
      // css={css({
      //   backgroundColor: 'rgba(0, 0, 0, 0.05)',
      //   border: '1px solid rgba(255, 255, 255, 0.2)',
      //   padding: 2,
      //   paddingLeft: 5,
      //   paddingRight: 5,
      //   fontFamily:
      //     "Monaco, Consolas, 'Andale  Mono', 'DejaVu Sans Mono', monospace",
      // })}
      {...props}
    >
      {children}
    </InlineCode>
  ),
  blockquote: ({ className, children, ...props }) => (
    <Blockquote
      className={clsx(
        `
    my-8
    border-l-4
    border-solid
    border-l-[#7F818C]
    pl-8
    text-2xl
    font-light
    italic
    text-[#24272E]
    dark:border-l-[#C4C4C4]
    dark:text-[#C4C4C4]
    `,
        className
      )}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TODO: find a way to fix type error
      // @ts-ignore
      css={css({
        '& > p': {
          lineHeight: '2.5rem',
        },
      })}
      {...props}
    >
      {children}
    </Blockquote>
  ),
  a: GenericLink,
  p: ({ className, children, ...props }) => (
    <p className={clsx('my-5 leading-relaxed', className)} {...props}>
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
