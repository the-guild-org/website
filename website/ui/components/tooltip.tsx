import { ReactElement, ReactNode } from 'react';
import {
  Content,
  Root,
  Trigger,
  Arrow,
  Portal,
  TooltipContentProps,
  TooltipProps,
  Provider,
} from '@radix-ui/react-tooltip';
import clsx from 'clsx';

export const Tooltip = ({
  children,
  content,
  side,
  delayDuration,
}: {
  children: ReactNode;
  content: string;
  side?: TooltipContentProps['side'];
  delayDuration?: TooltipProps['delayDuration'];
}): ReactElement => {
  return (
    <Root delayDuration={delayDuration}>
      <Trigger asChild>{children}</Trigger>
      {content && (
        <Portal>
          <Content
            sideOffset={5}
            side={side}
            className={clsx(
              `
  rounded
  bg-zinc-700
  px-3.5
  py-2.5
  text-xs
  text-gray-50
  [box-shadow:hsl(206_22%_7%/35%)_0_10px_38px_-10px,hsl(206_22%_7%/20%)_0_10px_20px_-15px]
  `
            )}
          >
            <Arrow className="fill-zinc-700" />
            {content}
          </Content>
        </Portal>
      )}
    </Root>
  );
};

Tooltip.Provider = Provider;
