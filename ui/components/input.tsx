import styled, { css } from 'styled-components';
import clsx from 'clsx';

const Input = styled.input.attrs(({ className }) => ({
  className: clsx(
    `
flex-grow
py-3 px-4
rounded-xl
border border-transparent
bg-gray-200
focus:outline-none
focus:border-blue-300
dark:text-gray-300
dark:bg-gray-800
disabled:cursor-not-allowed
`,
    className
  ),
  css: css`
    &:focus {
      box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45); /* use tailwindcss class in v3 */
    }
  `,
}));

export default Input;
