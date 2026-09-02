import { ComponentProps, ReactElement, ReactNode } from "react";

// Image props compatible with @unpic/react
export interface IImage {
  alt: string;
  className?: string;
  height: number;
  priority?: boolean;
  src: string;
  width: number;
}

export type ILink = Pick<
  ComponentProps<"a">,
  "className" | "onClick" | "rel" | "style" | "target" | "title"
> & {
  children?: ReactNode;
  newWindow?: boolean;
} & {
  href: { pathname?: string } | string;
};

export interface IFeatureListProps {
  className?: string;
  description?: string;
  items: {
    description: string;
    image: IImage;
    link?: ILink;
    title: string;
  }[];
  link?: ILink;
  title?: string;
}

export interface IInfoListProps {
  className?: string;
  items: {
    description: ReactNode | string;
    link?: ILink;
    title: ReactNode | string;
  }[];
  title?: ReactNode | string;
}

export interface IHeroIllustrationProps {
  className?: string;
  description: ReactNode | string;
  flipped?: boolean;
  image: IImage;
  link?: ILink;
  title: ReactNode | string;
}

export interface IHeroGradientProps {
  className?: string;
  colors?: string[];
  description: ReactNode | string;
  image?: IImage;
  link?: ILink | ILink[];
  title: ReactNode | string;
  version?: ReactNode | string;
}

export interface IHeroMarketplaceProps {
  className?: string;
  description: ReactNode | string;
  image?: IImage;
  link: ILink;
  title: ReactNode | string;
}

export interface IMarketplaceItemProps {
  description: ReactNode | string;
  image: IImage;
  link: Omit<ILink, "children">;
  modal?: {
    content: (() => ReactNode) | ReactNode | string;
    header: {
      description?: ILink | string;
      image?: IImage;
    };
  };
  tags?: string[];
  title: string;
  update: string;
  weeklyNPMDownloads?: number;
}

export interface IMarketplaceListProps {
  className?: string;
  colorScheme?: "green" | "neutral";
  items: IMarketplaceItemProps[];
  pagination: number;
  placeholder: ReactElement | string;
  title?: string;
}

export interface IMarketplaceSearchProps {
  className?: string;
  colorScheme?: "green" | "neutral";
  placeholder: string;
  primaryList: IMarketplaceListProps;
  queryList?: IMarketplaceListProps;
  secondaryList?: IMarketplaceListProps;
  tagsFilter?: readonly string[] | string[];
  title: ReactNode | string;
}
