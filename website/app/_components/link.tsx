import { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import { Anchor } from '@theguild/components';

export const Link = ({
  children,
  href = '',
  className,
  ...props
}: Omit<ComponentProps<'a'>, 'ref'>): ReactElement => {
  return (
    <Anchor href={href} className={clsx('text-[#1cc8ee] hover:underline', className)} {...props}>
      {children}
    </Anchor>
  );
};
