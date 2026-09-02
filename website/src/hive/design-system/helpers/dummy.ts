import heroIllustrationImage from "../static/dummy/envelop/communication.png";
import featureListImage3 from "../static/dummy/envelop/features-modern.png";
import featureListImage2 from "../static/dummy/envelop/features-performant.png";
import featureListImage1 from "../static/dummy/envelop/features-pluggable.png";
import yogaImage from "../static/illustrations/yoga.svg";
import {
  IFeatureListProps,
  IHeroGradientProps,
  IHeroIllustrationProps,
  IHeroMarketplaceProps,
  IInfoListProps,
} from "../types/components";

export const dummyFeatureList: IFeatureListProps = {
  description: "Powerful plugin system learn more learn more",
  items: [
    {
      description: "Powerful plugin system",
      image: {
        alt: "Toy Brick Icon",
        height: 112,
        src: featureListImage1,
        width: 112,
      },
      link: {
        children: "GitHub",
        href: "https://github.com/the-guild-org",
        title: "Learn more",
      },
      title: "Pluggable",
    },
    {
      description: "Use any Node framework, use any execution",
      image: {
        alt: "Gauge Icon",
        height: 112,
        src: featureListImage2,
        width: 112,
      },
      title: "Performant",
    },
    {
      description: "Use all the latest GraphQL Capabilities",
      image: {
        alt: "Toy Brick Icon",
        height: 112,
        src: featureListImage3,
        width: 112,
      },
      title: "Modern",
    },
  ],
  link: {
    children: "Hello world",
    href: "/wow",
  },
  title: "The best and simple features",
};

export const dummyInfoList: IInfoListProps = {
  items: [
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.",
      link: {
        children: "Documentation",
        href: "#",
        title: "Read the documentation",
      },
      title: "Install GraphQL Envelop",
    },
    {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas euismod amet duis quisque semper.",
      link: {
        children: "GitHub",
        href: "https://github.com/dotansimha/envelop",
        title: "View the code",
      },
      title: "GitHub integration",
    },
    {
      description:
        "We want to hear from you, our community of fellow engineers.",
      link: {
        children: "envelop@theguild.dev",
        href: "mailto:envelop@theguild.dev",
        title: "Reach us out",
      },
      title: "Let's work together",
    },
  ],
  title: "Get Started",
};

export const dummyHeroIllustration: IHeroIllustrationProps = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc scelerisque mauris imperdiet nulla vehicula, vitae porttitor massa consequat. Proin semper bibendum aliquam.",
  flipped: true,
  image: {
    alt: "Illustration",
    height: 400,
    src: heroIllustrationImage,
    width: 400,
  },
  link: {
    children: "Documentation",
    href: "#",
    title: "Read the documentation",
  },
  title: "Direct communication with your server",
};

export const dummyHeroGradient: IHeroGradientProps = {
  colors: ["#ff34ae", "#1cc8ee"],
  description:
    "Use any Node framework and any GraphQL feature, with the easiest plugins system - A new framework by The Guild",
  image: {
    alt: "Illustration",
    height: 300,
    src: yogaImage,
    width: 300,
  },
  link: {
    children: "Get Started",
    href: "/docs",
    title: "Learn more about GraphQL Envelop",
  },
  title: "A GraphQL server framework for improved developer experience",
  version: "1.0.7",
};

export const dummyHeroMarketplace: IHeroMarketplaceProps = {
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec sem ex. Aenean semper vehicula nibh non luctus. In rutrum nisl vitae ligula mollis feugiat.",
  link: {
    children: "Get Started",
    href: "#",
    title: "Learn more about the ",
  },
  title: "Marketplace",
};
