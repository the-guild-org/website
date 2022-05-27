import clsx from 'clsx';
import { ComponentProps, ReactElement } from 'react';

const Input = ({
  className,
  ...props
}: ComponentProps<'input'>): ReactElement => {
  return (
    <input
      className={clsx(
        `
  grow
  rounded-xl
  border
  border-transparent
  bg-gray-200
  py-3
  px-4
  focus:border-blue-300
  focus:outline-none
  focus:[box-shadow:0_0_0_3px_rgba(164,202,254,0.45)]
  disabled:cursor-not-allowed
  dark:bg-gray-800
  dark:text-gray-300`,
        className
      )}
      {...props}
    />
  );
};

export default Input;
