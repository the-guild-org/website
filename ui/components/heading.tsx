import styled from 'styled-components';
import clsx from 'clsx';

type Size = 'lg' | 'md';

const Heading = styled.h2.attrs<{ $size?: Size }>(
  ({ className, $size = 'lg' }) => ({
    className: clsx(
      'm-0 mb-2',
      $size === 'lg' && 'text-5xl leading-tight dark:text-gray-50',
      $size === 'md' && 'text-lg font-bold leading-7 dark:text-gray-50',
      className
    ),
  })
) as any;

export default Heading;
