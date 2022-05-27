import clsx from 'clsx';
import { ComponentProps, ReactElement } from 'react';
import { styled } from '../../stitches.config';

const ButtonWithAsProp = styled('button', {});

const Button = ({
  className,
  children,
  variant = 'secondary',
  ...props
}: Omit<ComponentProps<'button'>, 'ref'> & {
  variant?: 'secondary' | 'primary';
  as?: 'a';
  href?: string;
}): ReactElement => {
  return (
    <ButtonWithAsProp
      className={clsx(
        `
  cursor-pointer
  rounded-xl
  border-0
  bg-gray-200
  py-4
  text-sm
  font-bold
  transition-all
  duration-200
  hover:bg-gray-300
  dark:bg-gray-800
  dark:hover:bg-gray-700`,
        {
          primary:
            'px-10 text-white opacity-80 [background:linear-gradient(114.44deg,#7433ff_0%,#ffa3fd_100%)] hover:opacity-100',
          secondary:
            'px-5 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400',
        }[variant],
        className
      )}
      {...props}
    >
      {children}
    </ButtonWithAsProp>
  );
};

export default Button;
