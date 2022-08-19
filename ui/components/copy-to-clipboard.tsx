import {
  ComponentProps,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import { Tooltip } from './tooltip';

const DEFAULT_PATH_PROPS = {
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const CheckIcon = ({ className }: { className?: string }): ReactElement => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20 6L9 17L4 12" {...DEFAULT_PATH_PROPS} />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }): ReactElement => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" {...DEFAULT_PATH_PROPS} />
    <path
      d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
      {...DEFAULT_PATH_PROPS}
    />
  </svg>
);

export const CopyToClipboard = ({ value }: { value: string }): ReactElement => {
  const [isCopied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);

  const handleClick = useCallback<
    ComponentProps<'button'>['onClick']
  >(async () => {
    setCopied(true);
    if (!navigator?.clipboard) {
      console.error('Access to clipboard rejected!');
    }
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      console.error('Failed to copy!');
    }
  }, [value]);

  const IconToUse = isCopied ? CheckIcon : CopyIcon;

  return (
    <Tooltip.Provider>
      <Tooltip
        content={isCopied ? 'Copied!' : ''}
        side="left"
        delayDuration={0}
      >
        <button
          onClick={handleClick}
          className={clsx(
            'absolute right-2 top-2 hidden rounded-md border bg-gray-800 p-2 transition hover:bg-gray-700',
            isCopied
              ? 'border-green-500 text-green-500'
              : 'border-gray-100/10 text-gray-500 hover:border-gray-100/30 hover:text-gray-400'
          )}
        >
          <IconToUse className="pointer-events-none h-4 w-4" />
        </button>
      </Tooltip>
    </Tooltip.Provider>
  );
};
