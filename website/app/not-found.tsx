import { FC } from 'react';
import { useMDXComponents as getDocsMDXComponents } from '@mdx-components';
import { NotFoundPage } from '@theguild/components';

const { h1: H1, p: P } = getDocsMDXComponents();

const Page: FC = () => {
  return (
    <NotFoundPage>
      <H1>404: Page Not Found</H1>
      <P>It seems like the page you are looking for does not exist, or has been moved.</P>
      <P>Our team tracks all broken links, and we will try to fix them as soon as possible.</P>
    </NotFoundPage>
  );
};

export default Page;
