import { Accordion } from "@base-ui-components/react/accordion";
import {
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  FC,
  ReactElement,
  ReactNode,
} from "react";

import { Anchor } from "../anchor";
import { cn } from "../cn";
import { Heading } from "../heading";
import { ChevronDownIcon } from "../icons";
import { AttachPageFAQSchema } from "./attach-page-faq-schema";

const UnwrapChild: FC<{ children?: ReactNode }> = (props) => props.children;

const a: FC<ComponentPropsWithoutRef<"a">> = (props) => (
  <Anchor
    className="hive-focus rounded-sm underline hover:text-blue-700"
    {...props}
    href={props.href!}
  >
    {props.children}
  </Anchor>
);

const h2: FC<ComponentPropsWithoutRef<"h2">> = (props) => (
  <Heading as="h2" className="basis-1/2" size="md" {...props} />
);

type MDXComponentProps = { components?: Record<string, FC> };

export const FrequentlyAskedQuestions: FC<{
  children: ReactElement<MDXComponentProps>;
  className?: string;
  faqPages?: string[];
}> = ({ children, className, faqPages }) => {
  return (
    <section
      className={cn(
        className,
        "flex flex-col gap-x-6 gap-y-2 px-4 py-6 text-green-1000 md:flex-row md:px-10 lg:gap-x-24 lg:px-[120px] lg:py-24",
      )}
    >
      <AttachPageFAQSchema faqPages={faqPages} />
      {cloneElement(children, {
        components: {
          a,
          h2,
          li: AccordionItem,
          p: UnwrapChild,
          ul: AccordionWrapper,
        },
      })}
    </section>
  );
};

const AccordionWrapper: FC<ComponentPropsWithoutRef<"ul">> = (props) => (
  <Accordion.Root className="basis-1/2 divide-y divide-beige-400 max-xl:grow">
    {props.children}
  </Accordion.Root>
);

const AccordionItem: FC<ComponentPropsWithoutRef<"li">> = (props) => {
  const texts = Children.toArray(props.children).filter(
    (child) => child !== "\n",
  );

  if (texts.length === 0) {
    return null;
  }

  if (texts.length < 2) {
    // eslint-disable-next-line no-console
    console.error(texts);
    throw new Error(
      `Expected a question and an answer, got ${texts.length} items`,
    );
  }

  const [first, ...answers] = texts;

  const question =
    typeof first === "string"
      ? first
      : typeof first === "object" && "type" in first
        ? (first as ReactElement<{ children?: ReactNode }>).props.children
        : null;

  if (!question) return null;

  return (
    <Accordion.Item
      className="data-open:pb-4 relative pb-0 focus-within:z-10"
      value={question}
    >
      <div
        itemProp="mainEntity"
        itemScope
        itemType="https://schema.org/Question"
      >
        <Accordion.Header>
          <Accordion.Trigger className="hive-focus duration-100 -mx-2 my-1 flex w-[calc(100%+1rem)] items-center justify-between rounded-xl bg-white px-2 py-3 text-left font-medium transition-colors hover:bg-beige-100/80 md:my-2 md:py-4">
            <span itemProp="name">{question}</span>
            <ChevronDownIcon className="size-5 in-data-open:transform-[rotateX(180deg)]" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Panel
          className="overflow-hidden bg-white text-green-800 data-closed:hidden"
          keepMounted
        >
          <div
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
          >
            <div className="space-y-2" itemProp="text">
              {answers.map((answer, i) => (
                <p key={i}>{answer}</p>
              ))}
            </div>
          </div>
        </Accordion.Panel>
      </div>
    </Accordion.Item>
  );
};
