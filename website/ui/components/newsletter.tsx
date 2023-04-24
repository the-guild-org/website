import { ReactElement } from 'react';
import clsx from 'clsx';
import { Button } from './button';
import { Description } from './description';
import { Heading } from './heading';
import { Input } from './input';
import { Link } from './link';
import { toast } from 'react-hot-toast';

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
        'my-12 flex max-w-3xl flex-col gap-2 rounded bg-gray-100 p-6 dark:bg-zinc-900 sm:mx-auto',
        className,
      )}
    >
      <Heading size="md" className="!m-0">
        Join our newsletter
      </Heading>
      <Description className="!mb-2">
        Want to hear from us when there&apos;s something new? Sign up and stay up to date!
      </Description>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const email = e.currentTarget.email.value;

          const response = await fetch('/api/newsletter-subscribe', {
            body: JSON.stringify({
              email,
            }),
            method: 'POST',
          });

          const responseData: { status: 'success' | 'error'; message: string } =
            await response.json();

          toast[responseData.status](responseData.message);
        }}
        name="beehiiv-form"
        target="_blank"
        className="flex items-start gap-2"
      >
        <Input type="email" name="email" id="member_email" placeholder="Enter your email" />
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
      <Description className="!mt-2">
        By subscribing, you agree with Beehiiv’s{' '}
        <Link href="https://www.beehiiv.com/tou">Terms of Service</Link> and{' '}
        <Link href="https://www.beehiiv.com/privacy">Privacy Policy</Link>.
      </Description>
      {!hideLinkToIssues && (
        <Link href="https://newsletter.the-guild.dev/" className="self-start">
          Recent issues of our newsletter
        </Link>
      )}
    </div>
  );
};
