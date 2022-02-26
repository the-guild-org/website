import styled from 'styled-components';
import tw from 'twin.macro';

type Size = 'lg' | 'md';

const Description = styled.p(({ $size = 'lg' }: { $size?: Size }) => [
  tw`text-gray-500`,
  $size === 'lg' && tw`leading-6 mb-7`,
  $size === 'md' && tw`text-xs leading-4 mb-6`,
]);

export default Description;
