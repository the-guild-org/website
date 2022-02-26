import styled from 'styled-components';
import clsx from 'clsx';

type Size = 'lg' | 'md';

const Description = styled.p.attrs<{ $size: Size }>(({ className, $size }) => ({
  className: clsx(
    'text-gray-500',
    $size === 'lg' && 'mb-7 leading-6',
    $size === 'md' && 'mb-6 text-xs leading-4',
    className
  ),
})) as any;

export default Description;
