import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Send } from 'react-feather';

import { useMutation } from './hooks';

const Form = styled.form`
  position: relative;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #354969;
  box-sizing: border-box;

  &:hover {
    border-color: #4d6894;
  }

  &:focus {
    border-color: #fff;
  }
`;

const Submit = styled.button`
  margin: 0;
  padding: 0;
  background-color: transparent;
  outline: none;
  border: 0 none;
  color: #334664;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const Input = styled.input`
  flex: 1;
  font-size: 15px;
  font-weight: 300;
  color: #ffffff;

  background: transparent;
  outline: none;
  border: 0 none;

  &::placeholder {
    color: #334664;
  }
`;

const Status = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: -20px;
`;

const Error = styled(Status)`
  color: #cc2b14;
`;

const Success = styled(Status)`
  color: #00eaff;
`;

export const InputField: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  const [email, setEmail] = useState<string>();
  const [result, mutate] = useMutation(
    `mutation sayHi($email: String!) { sayHi(email: $email) { ok } }`,
  );
  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      mutate({ email });
    },
    [email, mutate],
  );
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!result.loading) {
        setEmail(event.target.value);
      }
    },
    [setEmail, result.loading],
  );

  useEffect(() => {
    if (result.complete) {
      setEmail('');
    }
  }, [result.complete, setEmail]);

  return (
    <div className={className}>
      <Form onSubmit={onSubmit}>
        <Input
          disabled={result.loading}
          type='text'
          value={email}
          onChange={onChange}
          placeholder='Type your email here'
        />
        <Submit type='submit'>
          <Send />
        </Submit>
        {result.error && (
          <Error>Something went wrong, please let us know on Slack</Error>
        )}
        {result.data && (
          <Success>We'll contact you soon!</Success>
        )}
      </Form>
    </div>
  );
};
