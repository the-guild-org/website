/* eslint-disable no-prototype-builtins */
interface CommonMeta {
  title: string;
  tags: string[];
  date: string;
  author?: string;
  authors?: string[];
  updateDate?: string;
  description: string;
  image: string;
  thumbnail?: string;
  canonical?: string;
}

export interface MetaWithAuthor extends CommonMeta {
  author: string;
}

export interface MetaWithAuthors extends CommonMeta {
  authors: string[];
}

export function hasAuthor(meta: object): meta is MetaWithAuthor {
  return meta.hasOwnProperty('author');
}

export function hasManyAuthors(meta: object): meta is MetaWithAuthors {
  return meta.hasOwnProperty('authors');
}

export function pickAuthor(meta: Meta): string {
  return meta.author || meta.authors[0];
}

export type Meta = MetaWithAuthor | MetaWithAuthors;

export type MetaWithLink = Meta & {
  link: string;
};

export interface NewsletterMeta {
  title: string;
  date: string;
  description: string;
}

export interface NewsletterMetaWithLink extends NewsletterMeta {
  link: string;
}
