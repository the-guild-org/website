import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Confetti from 'react-confetti';
import * as Yup from 'yup';
import { Image } from '@theguild/components';
import { Button, Description, Heading, Input, Link } from './components';
import getInTouch from '../public/img/get-in-touch.png';

export const GetInTouchForm = (): ReactElement => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isSubmitting, isValid, errors, touched } =
    useFormik({
      initialValues: { email: '', name: '', notes: '' },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().required(),
        notes: Yup.string().optional().default(''),
      }),
      async onSubmit({ name, email, notes }) {
        try {
          if ('ko' in globalThis) {
            globalThis.ko.identify({ email, name });
          }
        } catch (_e) {
          // nothing to do here, maybe koala was not loaded
        }

        const response = await fetch('https://utils.the-guild.dev/api/contact-us', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            notes,
          }),
        });

        if (!response.ok) {
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
      {hasPower && confetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} className="!fixed" />
      )}
      <p className="border-0 text-gray-400">
        {success
          ? "Thank you, we'll contact you soon!"
          : error && (
              <span className="text-red-500">
                <b>Something went wrong</b>, please try again or contact us{' '}
                <a href="mailto:contact@the-guild.dev">directly through email</a>.
              </span>
            )}
      </p>

      {!success && (
        <form onSubmit={handleSubmit} className="flex items-start gap-2">
          <div className="grow">
            <Input
              name="name"
              placeholder="Your name"
              className="peer mb-2"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.name && !!errors.name}
            />
            {touched.name && errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name}</p>
            )}
            <Input
              name="email"
              placeholder="Enter your email"
              className="peer mb-2"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
            <Input
              name="notes"
              placeholder="Notes?"
              className="peer"
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            variant="primary"
            loading={isSubmitting}
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export function GetInTouchSection({ hideCover }: { hideCover?: boolean }): ReactElement {
  return (
    <div
      className={clsx(
        'py-16 lg:py-32',
        hideCover ? 'mx-auto max-w-xl' : 'nextra-container grid gap-16 lg:grid-cols-2',
      )}
    >
      <div className={hideCover ? 'md:text-center' : ''}>
        <Heading id="get-in-touch">Get in Touch</Heading>

        <Description className={clsx('mx-auto !mb-10 md:!mb-24', hideCover && 'md:max-w-xl')}>
          Looking to work with The Guild, learn more about our solutions or just validate with us
          your API strategy? We will be happy to speak with you and learn about your efforts for
          free! <Link href="mailto:contact@the-guild.dev">contact@the-guild.dev</Link>
        </Description>

        <GetInTouchForm />
      </div>

      {!hideCover && (
        <Image src={getInTouch} alt="Hive website" className="drag-none max-lg:hidden" />
      )}
    </div>
  );
}
