export type Blog = {
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

export type BlogWithLink = Omit<Blog, 'tags' | 'authors'> & {
  tags: string[];
  authors: string[];
  link: string;
};
