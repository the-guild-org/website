export type Meta = {
  title: string;
  tags: string | string[];
  date: string;
  authors: string | string[];
  updateDate?: string;
  description: string;
  image: string;
  thumbnail?: string;
  canonical?: string;
};

export type MetaWithLink = Omit<Meta, 'tags' | 'authors'> & {
  tags: string[];
  authors: string[];
  link: string;
};
