export interface Meta {
  title: string;
  author: string;
  tags: string[];
  date: string;
  description: string;
  image: string;
  thumbnail?: string;
}

export interface MetaWithLink extends Meta {
  link: string;
}
