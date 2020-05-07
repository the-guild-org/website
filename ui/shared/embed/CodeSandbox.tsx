import React, { FunctionComponent } from 'react';
import { Observer } from '../Observer';
export interface ICodeSandboxProps {
  /** CodeSandbox id */
  codeSandboxId: string;
}

export const CodeSandbox: FunctionComponent<ICodeSandboxProps> = ({
  codeSandboxId,
}: ICodeSandboxProps) => (
  <Observer>
    <iframe
      title={`codeSandbox-${codeSandboxId}`}
      className="codesandbox-mdx-embed"
      src={`https://codesandbox.io/embed/${codeSandboxId}`}
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: ' hidden',
      }}
    />
  </Observer>
);
