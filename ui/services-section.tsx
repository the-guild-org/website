import { FC } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { Anchor, Description, Heading } from './components';

const ServiceCard = styled.a`
  &:hover {
    box-shadow: 0 -6px 34px rgba(117, 117, 117, 0.15);
  }
`;

export const ServicesSection: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-28 text-center">
        <Heading>The Guild's Services</Heading>
        <Description className="max-w-[700px] px-2 md:px-0">
          Work directly with the most powerful group of API developers that
          created the open source infrastructure you use today
        </Description>
        <NextLink href="/services">
          <Anchor>Learn more about our services ➔</Anchor>
        </NextLink>
      </div>
      <div className="container mt-[117px] flex flex-wrap justify-center">
        {SERVICES.map((service) => (
          <NextLink key={service.name} href={service.url} passHref>
            <ServiceCard
              title={service.name}
              className="
              dark:bg-[rgba(36, 39, 46, 0.3)]
              m-4
              h-[370px]
              w-[278px]
              overflow-hidden
              rounded-t-2xl
              border-2
              border-solid
              border-transparent
              bg-gray-100
              text-center
              duration-200
              hover:border-gray-200
              dark:hover:border-[#24272E]"
            >
              <img
                src={`/img/illustrations/${service.icon}`}
                alt={`${service.name} illustration`}
              />
              <Heading $size="md">{service.name}</Heading>
              <Description className="mb-4 px-4 text-sm">
                {service.description}
              </Description>
              <span
                className="
                text-xs
                text-gray-500
                transition-colors
                duration-200
                hover:text-gray-600
                dark:hover:text-gray-300"
              >
                Learn more ➔
              </span>
            </ServiceCard>
          </NextLink>
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
  icon: `${string}.svg`;
  url: `/services#${string}`;
}[] = [
  {
    name: 'Consulting',
    description: 'Make the right choices, for now and the future.',
    longDescription:
      'Plan together your next big steps. Get wide and deep perspectives from our experience working with the largest companies and applications in the world, to make sure you reach your ambitions goals with success!',
    icon: 'consulting.svg',
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
    icon: 'training.svg',
    url: '/services#training',
    longDescription:
      'Strengthen, mentor and inspire your team by the leaders of the community. Tailored to your people and mission, aimed to help establish long lasting teams.',
  },
  {
    name: 'Engineering',
    description: `Working side by side, us being an integral part of your team.`,
    icon: 'engineering.svg',
    url: '/services#engineering',
    longDescription:
      'We take pride in the fact that our open source and infrastructure comes from working side by side with the best developers in the world, on the largest applications in the world.',
    list: [
      'Integral part of your team',
      'Coding practical tasks',
      'Code reviews',
      'Mentorship',
    ],
  },
  {
    name: 'Open Source',
    description: 'Get Open Source support from the actual creators.',
    icon: 'open-source.svg',
    url: '/services#open-source',
    longDescription:
      'Safe Open Source. Make open source work for you and take your needs into the highest priority. Instead of structuring your whole app on top of open source you have no control or say about.',
    list: [
      'Technical support',
      'Covers the entire stack',
      'Part of decision making process',
    ],
  },
];
