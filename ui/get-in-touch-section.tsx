import { css } from 'styled-components';
import tw from 'twin.macro';
import { FC, ChangeEvent, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useMutation } from '../hooks/use-graphql';
import { Heading, Description, Button, Anchor } from '../ui';

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

const FixedConfetti = styled(Confetti)`
  position: fixed !important;
`;

import React from 'react';

function Submit({ children, isLoading, ...props }) {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

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
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
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
      <p css={[tw`border-0 text-gray-300`]}>
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
            css={[
              css`
                background: #24272e !important;
              `,
              tw`border-0 text-gray-300`,
            ]}
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
    <div css={[tw`relative my-[200px] md:mb-[400px]`]}>
      <div css={[tw`container mx-auto flex`]}>
        <div css={tw`flex-1 lg:max-w-[500px] p-4 2xl:pl-40`}>
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
        {!hideCover ? (
          <div css={tw`flex-1 hidden xl:block`}>
            {/* Keep in mind order of images, most of button we'll cover others */}
            <img
              src="/img/get-in-touch/swift.png"
              alt="Swift website"
              css={[
                css`
                  right: -4%;
                  top: -30%;
                `,
                tw`absolute opacity-20`,
              ]}
              width={719}
            />
            <img
              src="/img/get-in-touch/swift.png"
              alt="Swift website"
              css={[
                css`
                  right: -1%;
                  top: -15%;
                `,
                tw`absolute`,
              ]}
              width={719}
            />
            <img
              src="/img/get-in-touch/hive.png"
              alt="Hive website"
              css={[
                css`
                  right: 0;
                `,
                tw`absolute`,
              ]}
              width={741}
              height={482}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
