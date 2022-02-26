import clsx from 'clsx';
import styled from 'styled-components';

const Button = styled.button.attrs(({ className }) => ({
  className: clsx(
    `
  py-4
  px-5
  text-sm
  font-bold
  text-gray-500
  hover:text-gray-600
  dark:hover:text-gray-400
  bg-gray-200
  hover:bg-gray-300
  dark:bg-gray-800
  dark:hover:bg-gray-700
  rounded-xl
  border-0
  transition-all
  duration-200
  cursor-pointer
`,
    className
  ),
})) as any;

export default Button;
