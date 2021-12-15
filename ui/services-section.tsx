import { FC } from 'react';
import NextLink from 'next/link';
import { css } from 'styled-components';
import tw, { styled } from 'twin.macro';
import { Anchor, Description, Heading } from './index';

const ServiceCard = styled.a`
  background: #16171c;

  &:hover {
    box-shadow: 0 -6px 34px rgba(117, 117, 117, 0.15);
    border-color: #24272e;
  }

  ${tw`w-[278px] h-[370px] m-4 rounded-t-2xl border-2 border-solid border-transparent overflow-hidden cursor-pointer duration-200 text-center`}
`;

export const ServicesSection: FC = () => {
  return (
    <div
      css={css`
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(41, 40, 40, 0.2) 100%
          ),
          #0b0d11;
      `}
    >
      <div css={tw`pt-28 flex flex-col items-center text-center`}>
        <Heading>The Guild’s Services</Heading>
        <Description css={tw`max-w-[700px] px-2 md:px-0`}>
          Work directly with the most powerful group of API developers that
          created the open source infrastructure you use today
        </Description>
        <NextLink href="/services">
          <Anchor>Learn more about our services ➔</Anchor>
        </NextLink>
      </div>
      <div css={tw`container mx-auto flex flex-wrap justify-center mt-[117px]`}>
        {SERVICES.map((service) => (
          <NextLink key={service.name} href={service.url}>
            <ServiceCard title={service.name}>
              <img
                src={`/img/illustrations/${service.icon}`}
                alt={`${service.name} illustration`}
              />
              <Heading $size="md">{service.name}</Heading>
              <Description css={tw`mb-4 text-sm`}>
                {service.description}
              </Description>
              <span
                css={tw`text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200`}
              >
                Learn more ➔
              </span>
            </ServiceCard>
          </NextLink>
        ))}
      </div>
    </div>
  );
};

const SERVICES: {
  name: string;
  description: string;
  icon: `${string}.svg`;
  url: `/services#${string}`;
}[] = [
  {
    name: 'Consulting',
    description: 'Make the right choices, for now and the future.',
    icon: 'consulting.svg',
    url: '/services#consulting',
  },
  {
    name: 'Training',
    description: 'Strengthen your team, tailored to your people and mission.',
    icon: 'training.svg',
    url: '/services#workshops-and-trainings',
  },
  {
    name: 'Engineering',
    description: `Working side by side, us being an integral part of your team.`,
    icon: 'engineering.svg',
    url: '/services#engineering',
  },
  {
    name: 'Open Source',
    description: 'Get Open Source support from the actual creators.',
    icon: 'open-source.svg',
    url: '/services#open-source',
  },
];
