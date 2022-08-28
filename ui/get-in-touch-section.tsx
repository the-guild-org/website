import clsx from 'clsx';
import { useState, ReactElement } from 'react';
import Confetti from 'react-confetti';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Image } from '@theguild/components';
import { useMutation } from '../hooks/use-graphql';
import { Heading, Description, Button, Input, Link } from './components';
import getInTouch from '../public/img/get-in-touch.png';

export const Newsletter = (): ReactElement => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const mutate = useMutation(
    `mutation sayHi($email: String!, $name: String) { sayHi(email: $email, name: $name, project: "WEBSITE") { ok } }`
  );

  const { handleSubmit, values, handleChange, handleBlur, isSubmitting, errors, touched } = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
    }),
    async onSubmit({ email }) {
      const { errors } = await mutate({ email, name: email });
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
    <>
      {hasPower && confetti && <Confetti width={window.innerWidth} height={window.innerHeight} className="!fixed" />}
      <p className="border-0 text-gray-400">
        {success
          ? "Thank you, we'll contact you soon!"
          : error && (
              <span className="text-red-500">
                <b>Something went wrong</b>, please try again or contact us directly through email.
              </span>
            )}
      </p>

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
            {touched.email && errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} variant="primary" loading={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export const GetInTouchSection = ({
  hideCover,
  hideHeading,
}: {
  hideCover?: boolean;
  hideHeading?: boolean;
}): ReactElement => {
  return (
    <div className={clsx('relative my-[200px]', !hideCover && 'md:mb-[400px]')}>
      <div className="container flex">
        <div className={clsx('flex-1', !hideCover && 'p-4 xl:max-w-[40%] 2xl:pl-40')}>
          {hideHeading !== true && <Heading>Get in touch</Heading>}

          <Description>
            Looking to work with The Guild, learn more about our solutions or just validate with us your API strategy?
            We will be happy to speak with you and learn about your efforts for free!{' '}
            <Link href="mailto:contact@the-guild.dev">contact@the-guild.dev</Link>
          </Description>

          <Newsletter />
        </div>
        {!hideCover && (
          <Image src={getInTouch} alt="Hive website" className="absolute right-0 hidden max-w-3xl drag-none xl:block" />
        )}
      </div>
    </div>
  );
};
