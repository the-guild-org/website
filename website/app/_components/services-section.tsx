import { ComponentProps, ReactElement } from 'react';
import { Description, Heading } from '@components';

function CheckIcon(props: ComponentProps<'svg'>): ReactElement {
  return (
    <svg viewBox="0 0 13 10" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M1 4.66902L4.55385 8.45983L11.6616 1.54017" />
    </svg>
  );
}

export function ServicesSection(): ReactElement {
  return (
    <div className="nextra-container py-16 lg:py-32">
      <div className="md:text-center">
        <Heading id="services">The Guild&apos;s Services</Heading>
        <Description className="mx-auto !mb-10 md:!mb-24 md:max-w-xl">
          Work directly with the most powerful group of API developers that created the open source
          infrastructure you use today
        </Description>
      </div>
      <ul className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(service => (
          <li key={service.name}>
            <div className="mb-5 text-lg font-medium">{service.name}</div>
            <div className="mb-2.5 text-gray-500">{service.description}</div>
            {service.list && (
              <ol className="flex flex-col gap-2.5">
                {service.list.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-500">
                    <CheckIcon className="text-dark h-2.5 dark:text-white" />
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const SERVICES: {
  name: string;
  description: string;
  list?: string[];
}[] = [
  {
    name: 'Consulting',
    description: 'Make the right choices, for now and the future.',
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
  },
  {
    name: 'Engineering',
    description: 'Working side by side, us being an integral part of your team.',
    list: ['Integral part of your team', 'Coding practical tasks', 'Code reviews', 'Mentorship'],
  },
  {
    name: 'Open Source',
    description: 'Get Open Source support from the actual creators.',
    list: ['Technical support', 'Covers the entire stack', 'Part of decision making process'],
  },
];
