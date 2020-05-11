import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container, Button } from '../ui/shared/Layout';
import { useMutation } from '../hooks/use-graphql';

const Main = styled(Container)`
  display: flex;
  flex-direction: row;
  padding: 75px 0;

  justify-content: space-between;
  align-items: center;

  & > * {
    width: 45%;
  }

  @media (max-width: 960px) {
    flex-direction: column;
    justify-content: center;

    & > *:first-child {
      margin-bottom: 25px;
    }

    & > * {
      width: 70%;
    }
  }

  @media (max-width: 640px) {
    & > * {
      width: 100%;
    }
  }
`;

const Title = styled.h2`
  color: var(--colors-text);
`;

const Description = styled.p`
  color: var(--colors-dim);
`;

const Email = styled.a`
  color: var(--colors-dim);
  font-size: 0.8rem;
`;

const FormTitle = styled.p`
  color: var(--colors-dim);
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
  border-width: 1px;
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
    opacity: 0.7;
  }
`;

const Submit = styled(Button)<{ state: State }>`
  flex-shrink: 0;
  flex-grow: 0;
  margin-left: 1rem;
  min-width: 150px;

  background-color: ${(props) =>
    props.state === State.Error
      ? 'var(--colors-error)'
      : props.state === State.Success
      ? 'var(--colors-primary)'
      : 'var(--colors-accent)'};

  &:hover {
    background-color: ${(props) =>
      props.state === State.Error
        ? 'var(--colors-error-light)'
        : props.state === State.Success
        ? 'var(--colors-dim-dark)'
        : 'var(--colors-accent-light)'};
  }

  @media (max-width: 640px) {
    margin-top: 1rem;
    margin-left: 0;
  }
`;

enum State {
  Idle,
  Loading,
  Error,
  Success,
}

function send(email: string) {
  return new Promise<State>((resolve) => {
    setTimeout(() => {
      resolve(Math.random() >= 0.5 ? State.Success : State.Error);
    }, 5000);
  });
}

const Blog: React.FC = () => {
  const [state, setState] = useState<State>(State.Idle);
  const [email, setEmail] = useState<string>();
  const [result, mutate] = useMutation(
    `mutation sayHi($email: String!, $project: String!) { sayHi(email: $email, project: $project) { ok } }`
  );
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail, email]
  );

  useEffect(() => {
    if (result.error) {
      setState(State.Error);
    } else if (result.complete) {
      setState(State.Success);
    } else if (result.loading) {
      setState(State.Loading);
    } else {
      setState(State.Idle);
    }
  }, [result, setState]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setState(State.Loading);
      mutate({ email, project: 'WEBSITE' });
    },
    [setState, email]
  );

  const isLoading = state === State.Loading;
  const buttonTextMap = {
    [State.Idle]: 'Submit',
    [State.Loading]: '. . .',
    [State.Error]: 'Try again',
    [State.Success]: 'Thank You!',
  };

  return (
    <Page title="Contact Us - The Guild" description="Get in touch!">
      <Hero shrink={true}>
        <span>Contact us</span>
      </Hero>
      <Section>
        <Main>
          <div>
            <Title>Get in touch</Title>
            <Description>
              Looking to work with The Guild or to learn more about our
              projects? We will be happy to speak with you!
            </Description>
            <Email href="mailto:contact@the-guild.dev" title="Our email">
              contact@the-guild.dev
            </Email>
          </div>
          <div>
            <FormTitle>
              Leave us your email, we will contact you soon.
            </FormTitle>
            <Form onSubmit={onSubmit}>
              <Input
                type="email"
                required={true}
                disabled={isLoading}
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
              />
              <Submit type="submit" state={state} disabled={isLoading}>
                {buttonTextMap[state]}
              </Submit>
            </Form>
          </div>
        </Main>
      </Section>
    </Page>
  );
};

export default Blog;
