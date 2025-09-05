import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn: typeof clsx = (...args) => {
  return twMerge(clsx(args));
};
