import { ReactElement } from 'react';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { GuildButton } from '@/hero';
import { Heading } from './heading';
import { Input } from './input';
import { Link } from './link';

const classes = {
  link: clsx(
    'text-[#24272e] dark:text-white underline hocus:no-underline _decoration-from-font [text-underline-position:from-font]',
  ),
};

export const Newsletter = ({ className }: { className?: string }): ReactElement => {
  return (
    <div
      className={clsx(
        'mb-16 flex gap-14 rounded-[30px] bg-[#f1f1f1] p-7 max-xl:flex-col md:p-24 lg:mb-32 xl:gap-48 dark:bg-[#24272E]/50',
        className,
      )}
    >
      <div className="text-[#7f818c] dark:text-[#7f818c]">
        <Heading className="mb-4">Join our newsletter</Heading>
        <p className="mb-4">
          Want to hear from us when there&apos;s something new?
          <br />
          Sign up and stay up to date!
        </p>
        <p>
          *By subscribing, you agree with Beehiiv’s{' '}
          <a className={classes.link} href="https://www.beehiiv.com/tou">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className={classes.link} href="https://www.beehiiv.com/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const email = e.currentTarget.email.value;

          const response = await fetch('https://utils.the-guild.dev/api/newsletter-subscribe', {
            body: JSON.stringify({ email }),
            method: 'POST',
          });

          const responseData: { status: 'success' | 'error'; message: string } =
            await response.json();

          toast[responseData.status](responseData.message);
        }}
        name="beehiiv-form"
        target="_blank"
        className=""
      >
        <Input
          className="mb-14"
          type="email"
          name="email"
          id="member_email"
          placeholder="Enter your email *"
        />
        <div className="flex items-start gap-10 max-md:flex-col md:items-center">
          {/* @ts-expect-error -- fixme */}
          <GuildButton
            as="button"
            type="submit"
            className="hocus:mr-5 mr-10 bg-[#24272e] text-[#fcfcfc] dark:bg-[#fcfcfc] dark:text-[#0f1114]"
          >
            Submit
          </GuildButton>
          <Link href="https://newsletter.the-guild.dev/" className={classes.link}>
            Recent issues of our newsletter
          </Link>
        </div>
      </form>
    </div>
  );
};
