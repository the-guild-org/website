import { css } from 'styled-components';
import tw from 'twin.macro';
import {
  FC,
  ChangeEvent,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useMutation } from '../hooks/use-graphql';
import { Heading, Description, Button, Anchor, Input } from '../ui';

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

function Submit({ children, isLoading, ...props }) {
  const ref = useRef(null);

  return (
    <Button
      type="submit"
      disabled={isLoading}
      css={[
        css`
          background: linear-gradient(114.44deg, #7433ff 0%, #ffa3fd 100%);
        `,
        tw`mt-5 sm:mt-0 sm:ml-5 px-10! text-white! opacity-80 hover:opacity-100`,
      ]}
      ref={ref}
      {...props}
    >
      {isLoading ? <>. . .</> : children}
    </Button>
  );
}

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
        <FixedConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <p css={tw`border-0 text-gray-300`}>
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
        <Form onSubmit={onSubmit}>
          <Input
            type="email"
            required
            disabled={loading}
            placeholder="Your Email Address"
            value={email}
            onChange={onChange}
          />
          <Submit type="submit" isLoading={loading}>
            Submit
          </Submit>
        </Form>
      )}
    </>
  );
};

export const GetInTouchSection: FC<{ hideCover?: boolean }> = ({
  hideCover,
}) => {
  return (
    <div css={[tw`relative my-[200px]`, !hideCover && tw`md:mb-[400px]`]}>
      <div css={tw`container mx-auto flex`}>
        <div
          css={[tw`flex-1`, !hideCover && tw`p-4 2xl:pl-40 lg:max-w-[500px]`]}
        >
          <Heading>Get in touch</Heading>

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
            css={tw`absolute right-0 hidden xl:block drag-none`}
          />
        )}
      </div>
    </div>
  );
};
