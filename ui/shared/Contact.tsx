import { FC, ChangeEvent, useCallback, useState, useEffect } from 'react';
import { styled } from '../../stitches.config';
import { Container } from './Layout';
import { useMutation } from '../../hooks/use-graphql';
import { runOnCrisp } from '../../lib/crisp';
import { Button } from '../components';

const Main = styled(Container, {
  display: 'flex',
  flexDirection: 'row',
  padding: '75px 0',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& > *': {
    width: '45%',
  },
  '@media (max-width: 960px)': {
    flexDirection: 'column',
    justifyContent: 'center',
    '& > *:first-of-type': {
      marginBottom: 25,
    },
    '& > *': {
      width: '70%',
    },
  },
  '@media (max-width: 640px)': {
    '& > *': {
      width: '100%',
    },
  },
});

const Title = styled('h2', {
  color: 'var(--colors-text)',
});

const Description = styled('p', {
  color: 'var(--colors-dim)',
});

const Email = styled('a', {
  color: 'var(--colors-dim)',
  fontSize: '0.8rem',
});

const FormTitle = styled('p', {
  color: 'var(--colors-dim)',
});

const Form = styled('form', {
  display: 'flex',
  alignItems: 'center',
  '@media (max-width: 640px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const Input = styled('input', {
  flexGrow: 1,
  flexShrink: 1,
  padding: '0.75rem 1rem',
  lineHeight: '1.5rem',
  fontSize: '1rem',
  borderRadius: '0.375rem',
  border: '1px solid #d2d6dc',
  backgroundColor: '#fff',
  appearance: 'none',
  margin: '0 5px 0 0',
  boxSizing: 'border-box',
  '&:focus': {
    boxShadow: '0 0 0 3px rgba(164, 202, 254, 0.45)',
    outline: 0,
    borderColor: '#a4cafe',
  },
  '&:disabled': {
    opacity: 'var(--hover-opacity)',
  },
});

const Submit = styled(Button, {
  flexShrink: 0,
  flexGrow: 0,
  marginLeft: '1rem',
  '@media (max-width: 640px)': {
    marginTop: '1rem',
    marginLeft: 0,
  },
});
//   background-color: ${(props) =>
//     props.state === State.Error
//       ? 'var(--colors-error)'
//       : props.state === State.Success
//       ? 'var(--colors-primary)'
//       : 'var(--colors-accent)'};
//
//   &:hover {
//     background-color: ${(props) =>
//       props.state === State.Error
//         ? 'var(--colors-error-light)'
//         : props.state === State.Success
//         ? 'var(--colors-dim-dark)'
//         : 'var(--colors-accent-light)'};
//   }

enum State {
  Idle,
  Loading,
  Error,
  Success,
}

export const Contact: FC = () => {
  const [state, setState] = useState<State>(State.Idle);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [result, mutate] = useMutation(
    `mutation sayHi($email: String!, $name: String) { sayHi(email: $email, name: $name, project: "WEBSITE") { ok } }`
  );
  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }, []);
  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

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

      runOnCrisp((crisp) => {
        crisp.push(['set', 'user:email', email]);
      });

      setState(State.Loading);
      mutate({ email, name });
    },
    [email, mutate, name]
  );

  const isLoading = state === State.Loading;
  const buttonTextMap = {
    [State.Idle]: 'Submit',
    [State.Loading]: '. . .',
    [State.Error]: 'Try again',
    [State.Success]: 'Thank You!',
  };

  return (
    <Main>
      <div>
        <Title>Get in touch</Title>
        <Description>
          Looking to work with The Guild or to learn more about our projects? We
          will be happy to speak with you!
        </Description>
        <Email href="mailto:contact@the-guild.dev" title="Our email">
          contact@the-guild.dev
        </Email>
      </div>
      <div>
        <FormTitle>Leave us your email, we will contact you soon.</FormTitle>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            required
            disabled={isLoading}
            placeholder="Your name"
            value={name}
            onChange={onNameChange}
          />
          <Input
            type="email"
            required
            disabled={isLoading}
            placeholder="Your Email"
            value={email}
            onChange={onEmailChange}
          />
          <Submit
            type="submit"
            // state={state}
            disabled={isLoading}
            variant="primary"
          >
            {buttonTextMap[state]}
          </Submit>
        </Form>
      </div>
    </Main>
  );
};
