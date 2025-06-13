import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Confetti from 'react-confetti';
import * as Yup from 'yup';
import { GuildButton, Heading, Input } from './components';

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
        notes: Yup.string().optional().required(),
      }),
      async onSubmit({ name, email, notes }) {
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-11">
          <Input
            name="name"
            placeholder="Name *"
            className="peer"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            isInvalid={touched.name && !!errors.name}
          />
          {touched.name && errors.name && (
            <p className="-mt-9 text-sm text-[#f6547b]">{errors.name}</p>
          )}
          <Input
            name="email"
            placeholder="Email *"
            className="peer"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            isInvalid={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <p className="-mt-9 text-sm text-[#f6547b]">{errors.email}</p>
          )}
          <Input
            name="notes"
            placeholder="Your message *"
            className="peer"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            isInvalid={touched.notes && !!errors.notes}
          />
          {touched.notes && errors.notes && (
            <p className="-mt-9 text-sm text-[#f6547b]">{errors.notes}</p>
          )}
          <GuildButton
            as="button"
            type="submit"
            // @ts-expect-error -- fixme
            disabled={isSubmitting || !isValid}
            className="self-start bg-[#24272e] !text-[#fcfcfc] dark:bg-[#fcfcfc] dark:!text-[#0f1114]"
          >
            Submit
          </GuildButton>
        </form>
      )}
    </>
  );
};

export function GetInTouchSection({ className }: { className?: string }): ReactElement {
  return (
    <div
      className={clsx(
        'mb-16 grid gap-14 rounded-[30px] bg-[#f1f1f1] p-7 dark:bg-[#24272E]/50 md:p-24 lg:mb-32 lg:grid-cols-2 xl:gap-48',
        className,
      )}
    >
      <div className="text-gray-500">
        <Heading id="get-in-touch" className="mb-4">
          Get in Touch
        </Heading>

        <p className="text-[#7f818c] dark:text-[#7f818c]">
          Looking to work with The Guild, learn more about our solutions or just validate with us
          your API strategy? We will be happy to speak with you and learn about your efforts for
          free!
        </p>
      </div>

      <div>
        <GetInTouchForm />
      </div>
    </div>
  );
}
