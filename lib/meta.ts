export type Meta = {
  title: string;
  tags: string | string[];
  date: string;
  authors?: string | string[];
  updateDate?: string;
  description: string;
  image: string;
  thumbnail?: string;
  canonical?: string;
}

export type MetaWithLink = Meta & {
  link: string;
};

export type NewsletterMeta =  {
  title: string;
  date: string;
  description: string;
}

export interface NewsletterMetaWithLink extends NewsletterMeta {
  link: string;
}
