import clsx from 'clsx';
import { FC, ChangeEvent, useCallback, useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useMutation } from '../hooks/use-graphql';
import { Heading, Description, Button, Anchor, Input } from './components';

export const Newsletter: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [result, mutate] = useMutation(
    `mutation sayHi($email: String!, $name: String) { sayHi(email: $email, name: $name, project: "WEBSITE") { ok } }`
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      mutate({ email, name: email });
    },
    [mutate, email]
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);

  useEffect(() => {
    if (result.complete) {
      setLoading(false);

      if (result.error) {
        setError(true);
      } else {
        setSuccess(true);
        setEmail('');
        setConfetti(true);

        setTimeout(() => {
          setConfetti(false);
        }, 5000);
      }
    }
  }, [result.complete, result.error]);

  const hasPower =
    typeof window === 'object' &&
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 1;

  return (
    <>
      {hasPower && confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          className="!fixed"
        />
      )}
      <p className="border-0 text-gray-300">
        {success
          ? `Thank you, we'll contact you soon!`
          : error && (
              <>
                <b>Something went wrong</b>, please try again or contact us
                directly through email.
              </>
            )}
      </p>
      {!success && (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row">
          <Input
            type="email"
            required
            disabled={loading}
            placeholder="Your Email Address"
            value={email}
            onChange={onChange}
          />
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="mt-5 sm:mt-0 sm:ml-5"
          >
            {loading ? '. . .' : 'Submit'}
          </Button>
        </form>
      )}
    </>
  );
};

export const GetInTouchSection: FC<{
  hideCover?: boolean;
  hideHeading?: boolean;
}> = ({ hideCover, hideHeading }) => {
  return (
    <div className={clsx('relative my-[200px]', !hideCover && 'md:mb-[400px]')}>
      <div className="container flex">
        <div
          className={clsx(
            'flex-1',
            !hideCover && 'p-4 xl:max-w-[40%] 2xl:pl-40'
          )}
        >
          {hideHeading !== true && <Heading>Get in touch</Heading>}

          <Description>
            Looking to work with The Guild, learn more about our solutions or
            just validate with us your API strategy? We will be happy to speak
            with you and learn about your efforts for free!{' '}
            <Anchor href="mailto:contact@the-guild.dev">
              contact@the-guild.dev
            </Anchor>
          </Description>

          <Newsletter />
        </div>
        {!hideCover && (
          <img
            src="/img/get-in-touch.png"
            alt="Hive website"
            width={768}
            className="absolute right-0 hidden drag-none xl:block"
          />
        )}
      </div>
    </div>
  );
};
