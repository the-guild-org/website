import { ComponentProps, ReactElement } from 'react';
import { Description, Heading } from './components';

function CheckIcon(props: ComponentProps<'svg'>): ReactElement {
  return (
    <svg viewBox="0 0 13 10" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M1 4.66902L4.55385 8.45983L11.6616 1.54017" />
    </svg>
  );
}

export function JoinUsServices(): ReactElement {
  return (
    <div className="nextra-container py-16 lg:py-32">
      <div className="md:text-center">
        <Heading id="join-us">Join Our Family</Heading>
        <Description className="mx-auto !mb-10 md:!mb-24 md:max-w-xl">
          We’re looking for talented people to join our team. Below you can see the range of services we provide to our clients. 
          By joining us, you’ll have the opportunity to work on real projects, learn from experienced professionals, and contribute 
          to impactful solutions that make a difference.
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
    description: 'Helping our clients make smart, future-proof decisions.',
    list: [
      'Assessing current systems',
      'Architectural reviews',
      'Developing long-term plans',
      'Prioritizing developer experience',
      'Optimizing tools and workflows',
    ],
  },
  {
    name: 'Training',
    description: 'Providing targeted programs to empower client teams.',
    list: [
      'Hands-on workshops',
      'Mentorship programs',
      'Custom curriculum for business needs',
    ],
  },
  {
    name: 'Engineering',
    description: 'Collaborating directly with clients as part of their teams.',
    list: ['Integrated development', 'Practical coding tasks', 'Code reviews', 'Mentorship'],
  },
  {
    name: 'Open Source Support',
    description: 'Offering expert guidance from the creators of popular open source projects.',
    list: ['Technical support', 'Full-stack coverage', 'Decision-making involvement'],
  },
];
