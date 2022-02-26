import { FC, ChangeEvent, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import clsx from 'clsx';
import { useMutation } from '../../hooks/use-graphql';
import Button from './button';
import Heading from './heading';
import Description from './description';
import Input from './input';

const Form = styled.form`
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FixedConfetti = styled(Confetti)`
  position: fixed !important;
`;

const Newsletter: FC<{ className?: string }> = ({ className }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [result, mutate] = useMutation(
    `mutation subscribe($email: String!) { subscribe(email: $email) { ok } }`
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      mutate({ email });
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

  const showForm = !success;
  const isClient = typeof window === 'object';
  const hasPower =
    isClient &&
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 1;

  return (
    <div
      className={clsx(
        'mt-20 rounded bg-gray-100 p-6 dark:bg-gray-900',
        className
      )}
    >
      {hasPower && confetti && (
        <FixedConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Heading $size="md">Join our newsletter</Heading>
      <Description className="mb-3">
        {success ? (
          'Thank you for joining!'
        ) : error ? (
          <>
            <b>Something went wrong</b>, please try again or contact us directly
          </>
        ) : (
          `Want to hear from us when there's something new? Sign up and stay up to
        date!`
        )}
      </Description>
      {showForm && (
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            required
            disabled={loading}
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
          />
          <Button
            type="submit"
            disabled={loading}
            className="
            mt-5
            border-0
            px-10
            text-white
            opacity-80
            [background:linear-gradient(114.44deg,#7433ff_0%,#ffa3fd_100%)]
            hover:text-white
            hover:opacity-100
            sm:mt-0
            sm:ml-5
            "
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Newsletter;
