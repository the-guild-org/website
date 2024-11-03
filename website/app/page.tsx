import { Metadata } from 'next';
import {
  Ecosystem,
  GetInTouchSection,
  Hero,
  Newsletter,
  RecommendedReadingSection,
  ServicesSection,
} from '@components';
import { getAllBlogs } from '../lib/all-blogs';
import { ClientLogosSection } from './_logos/client-logos-section';

export const metadata: Metadata = {
  title: 'GraphQL',
  description:
    'Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings.',
  openGraph: {
    images: 'https://open-graph-image.theguild.workers.dev/?product=GUILD&title=GraphQL%20Tools',
  },
};

export default async function IndexPage() {
  const allBlogs = await getAllBlogs();
  return (
    <>
      <Hero />
      <ClientLogosSection />
      <Ecosystem />
      <ServicesSection />
      <div className="nextra-container">
        <GetInTouchSection />
      </div>
      <RecommendedReadingSection articles={allBlogs.slice(0, 4)} />
      <div className="nextra-container">
        <Newsletter />
      </div>
    </>
  );
}
