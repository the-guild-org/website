import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Send } from 'react-feather';

import { useMutation } from './hooks';

const Form = styled.form`
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

export const InputField: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  const [email, setEmail] = useState<string>();
  const [result, mutate] = useMutation(
    `mutation sayHi($email: String!) { sayHi(email: $email) { ok } }`,
  );
  const onChange = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log('email', email);
      mutate({ email });
    },
    [email, mutate],
  );

  console.log({ result });

  return (
    <div className={className}>
      <Form onSubmit={onChange}>
        <Input
          type='text'
          value={email}
          onChange={e => {
            e.preventDefault();
            setEmail(e.currentTarget.value);
          }}
          placeholder='Type your email here'
        />
        <Submit type='submit'>
          <Send />
        </Submit>
      </Form>
    </div>
  );
};
