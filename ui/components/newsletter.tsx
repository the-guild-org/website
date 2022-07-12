import { ReactElement } from 'react';
import clsx from 'clsx';
import { Button } from './button';
import { Heading } from './heading';
import { Input } from './input';
import { GenericLink } from './link';
import { Description } from './description';

export const Newsletter = ({
  className,
  hideLinkToIssues,
}: {
  className?: string;
  hideLinkToIssues?: boolean;
}): ReactElement => {
  return (
    <div
      className={clsx(
        'mx-5 my-20 flex max-w-3xl flex-col gap-2 rounded bg-gray-100 p-6 dark:bg-zinc-900 sm:mx-auto',
        className
      )}
    >
      <Heading size="md" className="!m-0">
        Join our newsletter
      </Heading>
      <Description className="!mb-2">
        Want to hear from us when there's something new? Sign up and stay up to
        date!
      </Description>
      <form
        action="https://www.getrevue.co/profile/TheGuild/add_subscriber"
        method="post"
        name="revue-form"
        target="_blank"
        className="flex items-start gap-2"
      >
        <div className="grow">
          <Input
            type="email"
            name="member[email]"
            id="member_email"
            placeholder="Enter your email"
            className="peer"
          />
        </div>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
      <Description className="!mt-2">
        By subscribing, you agree with Revue’s{' '}
        <a
          className="text-black"
          target="_blank"
          href="https://www.getrevue.co/terms"
          rel="noreferrer"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          className="text-black"
          target="_blank"
          href="https://www.getrevue.co/privacy"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        .
      </Description>
      {!hideLinkToIssues && (
        <GenericLink
          href="https://www.getrevue.co/profile/TheGuild"
          className="self-start"
          target="_blank"
        >
          Recent issues of our newsletter
        </GenericLink>
      )}
    </div>
  );
};
