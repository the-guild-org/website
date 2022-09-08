import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';
import { onlyText } from 'react-children-utilities';
import { CopyToClipboard, Link, Image } from '../../components';
import { CodeSandbox } from '../../shared/embed/CodeSandbox';
import { Gfycat } from '../../shared/embed/Gfycat';
import { StackBlitz } from '../../shared/embed/StackBlitz';
import { Tweet } from '../../shared/embed/Tweet';
import { YouTube } from '../../shared/embed/YouTube';
import { LinkPreview } from '../../shared/embed/LinkPreview';

const PreComponent = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <pre className="relative overflow-x-scroll rounded-md bg-[#161b22] p-4">
      <style jsx>{`
        pre:hover > :global(button) {
          display: block;
        }
      `}</style>
      <CopyToClipboard value={onlyText(children)} />
      {children}
    </pre>
  );
};

export const components: Record<string, (props: unknown) => ReactElement> = {
  h1: ({ className, children, ...props }) => (
    <h1 className={clsx('mb-5 text-3xl font-extrabold dark:text-[#FCFCFC]', className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }) => (
    <h2 className={clsx('mt-12 mb-3 text-2xl font-extrabold dark:text-[#FCFCFC]', className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }) => (
    <h3 className={clsx('mt-8 mb-2 text-xl font-extrabold dark:text-[#FCFCFC]', className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }) => (
    <h4 className={clsx('mt-8 mb-2 text-lg font-extrabold dark:text-[#FCFCFC]', className)} {...props}>
      {children}
    </h4>
  ),
  li: ({ className, children, ...props }) => (
    <li className={clsx('mb-1.5', className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ className, children, ...props }) => (
    <ul className={clsx('relative mb-8 list-disc pl-8', className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({ className, children, ...props }) => (
    <ol className={clsx('mb-8', className)} {...props}>
      {children}
    </ol>
  ),
  pre: PreComponent,
  code: ({ className, syntax, children, ...props }) => (
    <code className={clsx(syntax, className)} {...props}>
      {children}
    </code>
  ),
  inlineCode: ({ className, wrap, children, ...props }) => (
    <code
      className={clsx('rounded-[5px] border border-solid border-gray-500/20 px-1 py-0.5', wrap && 'wrap', className)}
      {...props}
    >
      {children}
    </code>
  ),
  blockquote: ({ className, children, ...props }) => (
    <blockquote
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
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: Link,
  p: ({ className, children, ...props }) => (
    <p className={clsx('my-5 leading-relaxed', className)} {...props}>
      {children}
    </p>
  ),
  hr: ({ className, ...props }) => <hr className={clsx('my-10 border-[#24272E]', className)} {...props} />,
  img: ({ className, alt, src, ...props }) => (
    <Image className={clsx('mx-auto block max-w-full', className)} src={src} alt={alt} {...props} />
  ),
  iframe: ({ className, children, ...props }) => (
    <iframe className={clsx('mx-auto block', className)} title="iframe" {...props}>
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
