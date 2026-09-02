import { ReactElement } from "react";

import { HideUntilInViewport } from "./hide-until-in-viewport";

export interface IStackBlitzProps {
  file?: string;
  /** StackBlitz id */
  stackBlitzId: string;
}

export const StackBlitz = ({
  file,
  stackBlitzId,
}: IStackBlitzProps): ReactElement => (
  <HideUntilInViewport fallback={<div style={{ height: 500 }} />}>
    <iframe
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      className="mt-6"
      sandbox="allow-modals allow-forms allow-popups allow-scripts"
      src={`https://stackblitz.com/edit/${stackBlitzId}?ctl=1&embed=1${
        file ? `&file=${file}` : ""
      }`}
      style={{
        border: 0,
        borderRadius: 4,
        height: 500,
        overflow: " hidden",
        width: "100%",
      }}
      title={`stackBlitz-${stackBlitzId}`}
    />
  </HideUntilInViewport>
);
