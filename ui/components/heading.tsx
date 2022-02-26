import styled from 'styled-components';
import clsx from 'clsx';

type Size = 'lg' | 'md';

const Heading = styled.h2.attrs<{ $size?: Size }>(
  ({ className, $size = 'lg' }) => ({
    className: clsx(
      'm-0 mb-2',
      $size === 'lg' && 'text-5xl dark:text-gray-50 leading-tight',
      $size === 'md' && 'text-lg font-bold dark:text-gray-50 leading-7',
      className
    ),
  })
);

export default Heading;
