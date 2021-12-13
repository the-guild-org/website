import { FC, ChangeEvent, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { Button } from '../shared/Layout';
import { useMutation } from '../../hooks/use-graphql';

const Container = styled.div`
  margin-top: 75px;
  padding: 25px;
  border-radius: 3px;
  background-color: #f1f1f1;
`;

const Header = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
`;

const Subheader = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--colors-dim-dark);
`;

const Form = styled.form`
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d2d6dc;
  background-color: #fff;
  appearance: none;
  margin: 0;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    outline: 0;
    border-color: #a4cafe;
  }

  &:disabled {
    opacity: var(--hover-opacity);
  }
`;

const Submit = styled(Button)`
  flex-shrink: 0;
  flex-grow: 0;
  margin-left: 1rem;

  @media (max-width: 640px) {
    margin-top: 1rem;
    margin-left: 0;
  }
`;

const FixedConfetti = styled(Confetti)`
  position: fixed !important;
`;

export const Newsletter: FC<{ className?: string }> = ({ className }) => {
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
    <Container className={className}>
      {hasPower && confetti && (
        <FixedConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <Header>Join our newsletter</Header>
      <Subheader>
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
      </Subheader>
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
          <Submit type="submit" disabled={loading}>
            Subscribe
          </Submit>
        </Form>
      )}
    </Container>
  );
};
