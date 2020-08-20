export const services: Array<{
  title: string;
  image: string;
  description?: string;
  highlight?: {
    description: string;
    title: string;
  };
  list?: string[];
}> = [
  {
    title: 'Consulting',
    image: 'onboarding.svg',
    description:
      'Plan together your next big steps. Get wide and deep perspectives from our experience working with the largest companies and applications in the world, to make sure you reach your ambitions goals with success!',
    list: [
      'Current state assessment',
      'Architectural review',
      'Future-proof development plan',
      'Focus on Developer Experience',
      'Tooling',
    ],
    highlight: {
      title: 'Consulting',
      description: 'Make the right choices, for now and the future.',
    },
  },
  {
    title: 'Workshops and Trainings',
    image: 'teaching.svg',
    description:
      'Strengthen, mentor and inspire your team by the leaders of the community. Tailored to your people and mission, aimed to help establish long lasting teams.',
    highlight: {
      title: 'Training',
      description: 'Strengthen your team, tailored to your people and mission.',
    },
  },
  {
    title: 'Engineering',
    image: 'work-time.svg',
    description:
      'We take pride in the fact that our open source and infrastructure comes from working side by side with the best developers in the world, on the largest applications in the world.',
    list: [
      'Integral part of your team',
      'Coding practical tasks',
      'Code reviews',
      'Mentorship',
    ],
    highlight: {
      title: 'Engineering',
      description:
        'Working side by side, us being an integral part of your team.',
    },
  },
  {
    title: 'Open Source',
    image: 'developer-activity.svg',
    description:
      'Safe Open Source. Make open source work for you and take your needs into the highest priority. Instead of structuring your whole app on top of open source you have no control or say about.',
    list: [
      'Technical support',
      'Covers the entire stack',
      'Part of decision making process',
    ],
    highlight: {
      title: 'Open Source',
      description: 'Get Open Source support from the actual creators.',
    },
  },
];
