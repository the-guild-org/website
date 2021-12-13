import { FC } from 'react';
import { Observer } from '../Observer';

export type EmbbedBoolean = '0' | '1';

// See: https://codesandbox.io/docs/embedding#embed-options
export type EmbedOptions = Partial<{
  module: string;
  autoresize: EmbbedBoolean;
  codemirror: EmbbedBoolean;
  eslint: EmbbedBoolean;
  expanddevtools: EmbbedBoolean;
  hidedevtools: EmbbedBoolean;
  fontsize: number;
  forcerefresh: EmbbedBoolean;
  highlights: number[];
  editorsize: number;
  initialpath: string;
  moduleview: EmbbedBoolean;
  previewwindow: 'console' | 'tests' | 'browser';
  runonclick: EmbbedBoolean;
  view: 'editor' | 'split' | 'preview';
  theme: 'dark' | 'light';
}>;

export interface ICodeSandboxProps {
  /** CodeSandbox id */
  codeSandboxId: string;
  embedOptions?: EmbedOptions;
  readonly?: boolean;
  size?: string;
}

export const CodeSandbox: FC<ICodeSandboxProps> = ({
  codeSandboxId,
  embedOptions = {},
  readonly,
  size,
}) => {
  const allOptions = {
    fontsize: 11,
    autoresize: '1',
    ...(embedOptions || {}),
  };

  const optionsQueryString = Object.keys(allOptions)
    .map((k) => `${k}=${allOptions[k]}`)
    .join('&');

  return (
    <Observer>
      <iframe
        title={`codeSandbox-${codeSandboxId}`}
        className="codesandbox-mdx-embed"
        src={`https://codesandbox.io/embed/${codeSandboxId}?${optionsQueryString}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        style={{
          width: '100%',
          height: size || '500px',
          border: 0,
          borderRadius: '4px',
          overflow: 'hidden',
          pointerEvents: readonly ? 'none' : 'auto',
        }}
      />
    </Observer>
  );
};
