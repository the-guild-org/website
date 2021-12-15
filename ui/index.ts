import styled from 'styled-components';
import tw from 'twin.macro';

type Size = 'lg' | 'md';

export const Heading = styled.h2(({ $size = 'lg' }: { $size?: Size }) => [
  tw`m-0 mb-2`,
  $size === 'lg' && tw`text-5xl text-gray-50 leading-tight`,
  $size === 'md' && tw`text-xl text-gray-50 leading-7`,
]);

export const Description = styled.p(({ $size = 'lg' }: { $size?: Size }) => [
  tw`text-gray-500`,
  $size === 'lg' && tw`leading-6 mb-7`,
  $size === 'md' && tw`text-xs leading-4 mb-6`,
]);

export const Anchor = tw.a`text-gray-500 font-bold hover:text-gray-300`;


export const Button = tw.button`text-sm text-gray-500 hover:text-gray-400 bg-gray-800 hover:bg-gray-700 px-5 py-4 border-0 rounded-xl font-bold cursor-pointer transition-all duration-200`
