import { ReactElement } from 'react';
import { Page } from '../ui/shared/Page';
import { PlatformSection } from '../ui/platform-section';

export default function OpenSource(): ReactElement {
  return (
    <Page
      title="Open Source - The Guild"
      description="Tech Stack developed by us. Every project is Open Source and most of them are focused around GraphQL."
      image="/img/ogimage.png"
    >
      <PlatformSection />
    </Page>
  );
}
