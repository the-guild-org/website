import clsx from 'clsx';
import { FC } from 'react';

const Button: FC<{ className?: string }> = ({ className, children }) => {
  return (
    <button
      className={clsx(
        `
  cursor-pointer
  rounded-xl
  border-0
  bg-gray-200
  py-4
  px-5
  text-sm
  font-bold
  text-gray-500
  transition-all
  duration-200
  hover:bg-gray-300
  hover:text-gray-600
  dark:bg-gray-800
  dark:hover:bg-gray-700
  dark:hover:text-gray-400
`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
