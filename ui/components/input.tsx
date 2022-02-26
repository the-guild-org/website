import styled, { css } from 'styled-components';
import clsx from 'clsx';

const Input = styled.input.attrs(({ className }) => ({
  className: clsx(
    `
grow
py-3
px-4
dark:text-gray-300
bg-gray-200 dark:bg-gray-800
rounded-xl
border
border-transparent
focus:border-blue-300
focus:outline-none
disabled:cursor-not-allowed
`,
    className
  ),
  css: css`
    &:focus {
      box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45); /* use tailwindcss class in v3 */
    }
  `,
})) as any;

export default Input;
