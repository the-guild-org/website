import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { Anchor, Image } from '@theguild/components';
import { Description, Heading, Link } from './components';
import consulting from '../public/img/illustrations/consulting.svg';
import engineering from '../public/img/illustrations/engineering.svg';
import openSource from '../public/img/illustrations/open-source.svg';
import training from '../public/img/illustrations/training.svg';

export const ServicesSection = (): ReactElement => {
  return (
    <>
      <div className="flex flex-col items-center px-4 pt-28 text-center sm:px-6 md:px-8">
        <Heading>The Guild&apos;s Services</Heading>
        <Description className="max-w-[700px] px-2 md:px-0">
          Work directly with the most powerful group of API developers that created the open source
          infrastructure you use today
        </Description>
        <Link
          href="/services"
          className="font-bold !text-gray-500 hover:!text-gray-600 hover:no-underline dark:hover:!text-gray-300"
        >
          Learn more about our services ➔
        </Link>
      </div>
      <div className="container mt-[117px] flex flex-wrap justify-center gap-4">
        {SERVICES.map(service => (
          <Anchor
            key={service.name}
            href={service.url}
            title={service.name}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-between
              overflow-hidden
              rounded-t-2xl
              border-2
              border-solid
              border-transparent
              bg-gray-100
              text-center
              duration-200
              hover:border-gray-200
              hover:[box-shadow:0_-6px_34px_rgba(117,117,117,0.15)]
              dark:bg-[#24272E4C]
              dark:hover:border-[#24272E] sm:w-1/2 md:w-1/3 lg:w-1/5
            "
          >
            <div className="flex-1">
              <Image src={service.icon} alt={`${service.name} illustration`} placeholder="empty" />
              <Heading size="md">{service.name}</Heading>
              <Description className="line-clamp-3 px-4 text-xs !leading-[18px] leading-4">
                {service.description}
              </Description>
            </div>
            <div
              className="
                pb-4
                text-xs
                text-gray-500
                transition-colors
                duration-200
                hover:text-gray-600
                dark:hover:text-gray-300"
            >
              Learn more ➔
            </div>
          </Anchor>
        ))}
      </div>
    </>
  );
};

export const SERVICES: {
  name: string;
  description: string;
  longDescription: string;
  list?: string[];
  icon: StaticImageData;
  url: `/services#${string}`;
}[] = [
  {
    name: 'Consulting',
    description: 'Make the right choices, for now and the future.',
    longDescription:
      'Plan together your next big steps. Get wide and deep perspectives from our experience working with the largest companies and applications in the world, to make sure you reach your ambitions goals with success!',
    icon: consulting,
    url: '/services#consulting',
    list: [
      'Current state assessment',
      'Architectural review',
      'Future-proof development plan',
      'Focus on Developer Experience',
      'Tooling',
    ],
  },
  {
    name: 'Training',
    description: 'Strengthen your team, tailored to your people and mission.',
    icon: training,
    url: '/services#training',
    longDescription:
      'Strengthen, mentor and inspire your team by the leaders of the community. Tailored to your people and mission, aimed to help establish long lasting teams.',
  },
  {
    name: 'Engineering',
    description: 'Working side by side, us being an integral part of your team.',
    icon: engineering,
    url: '/services#engineering',
    longDescription:
      'We take pride in the fact that our open source and infrastructure comes from working side by side with the best developers in the world, on the largest applications in the world.',
    list: ['Integral part of your team', 'Coding practical tasks', 'Code reviews', 'Mentorship'],
  },
  {
    name: 'Open Source',
    description: 'Get Open Source support from the actual creators.',
    icon: openSource,
    url: '/services#open-source',
    longDescription:
      'Safe Open Source. Make open source work for you and take your needs into the highest priority. Instead of structuring your whole app on top of open source you have no control or say about.',
    list: ['Technical support', 'Covers the entire stack', 'Part of decision making process'],
  },
];
