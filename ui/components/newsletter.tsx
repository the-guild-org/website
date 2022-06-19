import { useState, ReactElement } from 'react';
import Confetti from 'react-confetti';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '../../hooks/use-graphql';
import { Button } from './button';
import { Heading } from './heading';
import { Description } from './description';
import { Input } from './input';
import { GenericLink } from './link';

export const Newsletter = ({
  className,
  hideLinkToIssues,
}: {
  className?: string;
  hideLinkToIssues?: boolean;
}): ReactElement => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const mutate = useMutation(
    `mutation subscribe($email: String!) { subscribe(email: $email) { ok } }`
  );

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
    }),
    async onSubmit({ email }) {
      const { errors } = await mutate({ email });
      if (errors) {
        setError(true);
        return;
      }

      setSuccess(true);
      setConfetti(true);

      setTimeout(() => {
        setConfetti(false);
      }, 5000);
    },
  });

  const hasPower =
    typeof window === 'object' &&
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 1;

  return (
    <div
      className={clsx(
        'mx-5 my-20 flex max-w-3xl flex-col gap-2 rounded bg-gray-100 p-6 dark:bg-zinc-900 sm:mx-auto',
        className
      )}
    >
      {hasPower && confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          className="!fixed"
        />
      )}
      <Heading size="md" className="!m-0">
        Join our newsletter
      </Heading>
      <Description className="!mb-2">
        {success ? (
          'Thank you for joining!'
        ) : error ? (
          <span className="text-red-500">
            <b>Something went wrong</b>, please try again or contact us directly
          </span>
        ) : (
          "Want to hear from us when there's something new? Sign up and stay up to date!"
        )}
      </Description>
      {!success && (
        <form onSubmit={handleSubmit} className="flex items-start gap-2">
          <div className="grow">
            <Input
              name="email"
              placeholder="Enter your email"
              className="peer"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.email && Boolean(errors.email)}
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </form>
      )}
      {!hideLinkToIssues && (
        <GenericLink href="/newsletter" className="self-start">
          Recent issues of our newsletter
        </GenericLink>
      )}
    </div>
  );
};
