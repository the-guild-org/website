import { FC } from 'react';
import clsx from 'clsx';
import { styled } from '../stitches.config';
import { Page } from '../ui/shared/Page';
import { Container, Arrow } from '../ui/shared/Layout';
import { HeroSection } from '../ui/hero-section';
import { Heading } from '../ui/components';
import { ClientLogosSection } from '../ui/client-logos-section';
import { SERVICES } from '../ui/services-section';
import { GetInTouchSection } from '../ui/get-in-touch-section';

const ServiceContainer = styled(Container, {
  display: 'flex',
  flexWrap: 'wrap',
  '& > div': {
    textAlign: 'left',
    flex: '0 0 50%',
    maxWidth: '50%',
  },
  '@media (max-width: 640px)': {
    '& > div': {
      maxWidth: '100%',
    },
  },
});

const Services: FC = () => {
  return (
    <Page
      title="Our Services - The Guild"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Our Services</Heading>
      </HeroSection>
      <ClientLogosSection />
      {SERVICES.map((service, i) => {
        const isOdd = i % 2 !== 0;
        return (
          <div
            className="
            py-16
            [background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.1)100%)]
            dark:[background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.2)100%),#0b0d11]
            "
            key={`service-${i}`}
          >
            <ServiceContainer
              reversed={isOdd}
              id={service.name.toLowerCase().replace(/ /g, '-')}
              className={clsx(
                'flex-col',
                isOdd ? 'md:flex-row-reverse' : 'md:flex-row'
              )}
            >
              <div>
                <img
                  src={`/img/illustrations/${service.icon}`}
                  alt={service.name}
                  className="mx-auto mb-12"
                />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-gray-50">
                  {service.name}
                </h2>
                <div className="my-4 text-[#7F818C]">{service.description}</div>
                {service.list && (
                  <ul>
                    {service.list.map((item, i) => (
                      <li
                        key={`item-${i}`}
                        className="flex items-center text-[#7F818C]"
                      >
                        <Arrow className="mr-2.5 text-[#05a5a6]" /> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ServiceContainer>
          </div>
        );
      })}
      <GetInTouchSection />
    </Page>
  );
};

export default Services;
