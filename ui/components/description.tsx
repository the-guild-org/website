import styled from 'styled-components';
import clsx from 'clsx';

type Size = 'lg' | 'md';

const Description = styled.p.attrs<{ $size: Size }>(({ className, $size }) => ({
  className: clsx(
    'text-gray-500',
    $size === 'lg' && 'leading-6 mb-7',
    $size === 'md' && 'text-xs leading-4 mb-6',
    className
  ),
}));

export default Description;
