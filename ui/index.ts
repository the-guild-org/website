import styled, { css } from 'styled-components';
import tw from 'twin.macro';

type Size = 'lg' | 'md';

export const Heading = styled.h2(({ $size = 'lg' }: { $size?: Size }) => [
  tw`m-0 mb-2`,
  $size === 'lg' && tw`text-5xl dark:text-gray-50 leading-tight`,
  $size === 'md' && tw`text-xl dark:text-gray-50 leading-7`,
]);

export const Description = styled.p(({ $size = 'lg' }: { $size?: Size }) => [
  tw`text-gray-500`,
  $size === 'lg' && tw`leading-6 mb-7`,
  $size === 'md' && tw`text-xs leading-4 mb-6`,
]);

export const Anchor = tw.a`text-gray-500 font-bold hover:text-gray-600 dark:hover:text-gray-300`;

export const Button = tw.button`
text-sm
text-gray-500
hover:text-gray-600
dark:hover:text-gray-400
bg-gray-200
hover:bg-gray-300
dark:bg-gray-800
dark:hover:bg-gray-700
px-5
py-4
border-0
rounded-xl
font-bold
cursor-pointer
transition-all
duration-200`;

export const Input = styled.input(() => [
  css`
    &:focus {
      box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45); /* use tailwindcss class in v3 */
    }
  `,
  tw`
flex-grow
py-3
px-4
rounded-xl
border
border-transparent
focus:outline-none
focus:border-blue-300
dark:text-gray-300
bg-gray-200
dark:bg-gray-800
disabled:cursor-not-allowed`,
]);
