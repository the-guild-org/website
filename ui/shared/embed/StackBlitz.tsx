import React, { FunctionComponent } from 'react';
import { Observer } from '../Observer';
export interface IStackBlitzProps {
  /** StackBlitz id */
  stackBlitzId: string;
  file?: string;
}

export const StackBlitz: FunctionComponent<IStackBlitzProps> = ({
  stackBlitzId,
  file,
}: IStackBlitzProps) => (
  <Observer>
    <iframe
      title={`stackBlitz-${stackBlitzId}`}
      className="codesandbox-mdx-embed"
      src={`https://stackblitz.com/edit/${stackBlitzId}?ctl=1&embed=1${
        file ? '&file=' + file : ''
      }`}
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
