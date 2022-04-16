import { FC } from 'react';
import { useRouter } from 'next/router';
import { Page } from '../../ui/shared/Page';
import { Hero } from '../../ui/shared/Layout';

const MaintenancePage: FC = () => {
  const router = useRouter();
  const { name, description } = router.query;

  return (
    <Page
      title={`${name} is offline - The Guild`}
      description={description as string}
      image="https://og-image-guild.vercel.app/We'll%20be%20back%20soon!.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fthe-guild.dev%2Fstatic%2Flogo.svg"
    >
      <Hero>
        <span>{name}</span> is offline
      </Hero>
    </Page>
  );
};

export default MaintenancePage;
