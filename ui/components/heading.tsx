import styled from 'styled-components';
import clsx from 'clsx';

type Size = 'lg' | 'md';

const Heading = styled.h2(({ $size = 'lg' }: { $size?: Size }) => [
  tw`m-0 mb-2`,
  $size === 'lg' && tw`text-5xl dark:text-gray-50 leading-tight`,
  $size === 'md' && tw`text-lg font-bold dark:text-gray-50 leading-7`,
]);

export default Heading;
