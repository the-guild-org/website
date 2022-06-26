import { ReactElement } from 'react';
import NextLink from 'next/link';
import { GetStaticProps } from 'next/types';
import { format } from 'date-fns';
import { getAllNewsletters } from '../lib/get-all-newsletters';
import { NewsletterMetaWithLink } from '../lib/meta';
import { Page } from '../ui/shared/Page';
import { HeroSection } from '../ui/hero-section';
import { Newsletter, Heading, Description } from '../ui/components';

interface Props {
  issues: NewsletterMetaWithLink[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      issues: await getAllNewsletters(),
    },
  };
};

const NewsletterPage = ({ issues }: Props): ReactElement => {
  return (
    <Page
      title="The Guild Blog"
      description="Subscribe to our newsletter"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>The Guild's newsletter</Heading>
        <Description>
          <ul style={{ textAlign: 'left', listStyleType: 'disc' }}>
            <li>The Guild and GraphQL Foundation projects releases</li>
            <li>Articles about GraphQL</li>
            <li>Tips on how to get the best of our tools</li>
          </ul>
        </Description>
      </HeroSection>
      <div className="container max-w-[1200px]">
        <Newsletter hideLinkToIssues />
        <div className="my-6 flex flex-wrap justify-center gap-x-7 gap-y-10">
          {issues.map((issue) => (
            <NextLink key={issue.link} href={issue.link} passHref>
              <a
                className="
        flex
        w-[278px]
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-solid
        bg-white
        transition-colors
        hover:border-[#7F818C]
        dark:border-transparent
        dark:bg-[#101218]
        hover:dark:border-[#7F818C]"
              >
                <div className="flex grow flex-col p-5">
                  <Heading size="md" className="line-clamp-3 [hyphens:auto]">
                    Issue #{issue.link.replace('/newsletter/issue-', '')}
                  </Heading>
                  <div className="mt-auto text-xs">
                    <span className="dark:text-gray-500">
                      {format(new Date(issue.date), 'LLL do y')}
                    </span>
                  </div>
                </div>
              </a>
            </NextLink>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default NewsletterPage;
