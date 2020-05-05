import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 125px;
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
  color: #555;
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

const Submit = styled.button`
  width: auto;
  height: auto;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 0.75rem 1.5rem;
  margin-left: 1rem;
  transition-duration: 0.15s;
  color: #fff;
  line-height: 1.375;
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  background-color: #161e2e;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #252f3f;
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.7;
    cursor: progress;
  }

  @media (max-width: 640px) {
    margin-top: 1rem;
    margin-left: 0;
  }
`;

export const Newsletter: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        if (Math.random() > 0.5) {
          setSuccess(true);
        } else {
          setError(true);
        }
      }, 3000);
    },
    [setLoading, setSuccess, setError]
  );

  const showForm = !success;

  return (
    <Container>
      <Header>Join our newsletter</Header>
      <Subheader>
        {success
          ? "Thank you for joining!"
          : error
          ? `Something went wrong, please try again or contact us directly`
          : `Want to hear from us when there's something new? Sign up and stay up to
        date!`}
      </Subheader>
      {showForm && (
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            required={true}
            disabled={loading}
            placeholder="Enter your email"
          />
          <Submit type="submit" disabled={loading}>
            Subscribe
          </Submit>
        </Form>
      )}
    </Container>
  );
};
