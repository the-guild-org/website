import { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Confetti from 'react-confetti';
import * as Yup from 'yup';
import { GuildButton, Heading, Input } from './components';
import { notion } from './notion-client';

const NOTION_DATABASE_ID = 'f43d5911-0af3-4ebc-9996-a3a1a5f11ba4';
async function upsertContact({
  name,
  email,
  github,
}: {
  name: string;
  email: string;
  github: string;
}) {
  // קודם ננסה לחפש לפי שדה מסוג Email
  let query = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: 'Email',
      email: { equals: email },
    },
  });

  // אם לא נמצאה רשומה, ננסה לחפש כ-rich_text
  if (query.results.length === 0) {
    query = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Email',
        rich_text: { equals: email },
      },
    });
  }

  const properties = {
    Name: {
      title: [{ text: { content: name } }],
    },
    Email: {
      email, // אם השדה באמת מסוג Email
      rich_text: [{ text: { content: email } }], // אם השדה מסוג טקסט
    },
    Link: {
      url: github,
    },
  };

  if (query.results.length > 0) {
    const pageId = query.results[0].id;
    return notion.pages.update({
      page_id: pageId,
      properties,
    });
  } else {
    return notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties,
    });
  }
}


export const JoinUsForm = (): ReactElement => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const { handleSubmit, values, handleChange, handleBlur, isSubmitting, isValid, errors, touched } =
    useFormik({
      initialValues: { email: '', name: '', github: '' },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        name: Yup.string().required(),
        github: Yup.string().url().required(),
      }),
      async onSubmit({ name, email, github }) {
        try {
          await upsertContact({ name, email, github });
          setSuccess(true);
          setConfetti(true);
        } catch (err) {
          console.error(err);
          setError(true);
        }
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
            name="github"
            placeholder="GitHub Profile URL *"
            className="peer"
            value={values.github}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            isInvalid={touched.github && !!errors.github}
          />
          {touched.github && errors.github && (
            <p className="-mt-9 text-sm text-[#f6547b]">{errors.github}</p>
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

export function JoinUsSection({ className }: { className?: string }): ReactElement {
  return (
    <div
      className={clsx(
        'mb-16 grid gap-14 rounded-[30px] bg-[#f1f1f1] p-7 md:p-24 lg:mb-32 lg:grid-cols-2 xl:gap-48 dark:bg-[#24272E]/50',
        className,
      )}
    >
      <div className="text-gray-500">
        <Heading id="get-in-touch" className="mb-4">
          Work With Us
        </Heading>

        <p className="text-[#7f818c] dark:text-[#7f818c]">
          We are always looking for talented people to join our team. If you are passionate about building great products and want to make an impact, we would love to hear from you!
        </p>
      </div>

      <div>
        <JoinUsForm />
      </div>
    </div>
  );
}
