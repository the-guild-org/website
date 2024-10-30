import { Metadata } from 'next';
import { ClientLogosSection } from '@/client-logos-section';
import { Newsletter } from '@/components';
import { Ecosystem } from '@/ecosystem';
import { GetInTouchSection } from '@/get-in-touch-section';
import { Hero } from '@/hero';
import { RecommendedReadingSection } from '@/recommended-reading-section';
import { ServicesSection } from '@/services-section';
import { getAllBlogs } from '../lib/all-blogs';

export const metadata: Metadata = {
  title: 'GraphQL',
  description:
    'Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings.',
  openGraph: {
    images: 'https://open-graph-image.theguild.workers.dev/?product=GUILD&title=GraphQL%20Tools',
  },
};

// eslint-disable-next-line import/no-default-export
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
