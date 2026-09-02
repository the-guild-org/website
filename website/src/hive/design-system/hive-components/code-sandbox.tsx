import { ReactElement } from "react";

import { HideUntilInViewport } from "./hide-until-in-viewport";

export type EmbbedBoolean = "0" | "1";

// See: https://codesandbox.io/docs/embedding#embed-options
export type EmbedOptions = Partial<{
  autoresize: EmbbedBoolean;
  codemirror: EmbbedBoolean;
  editorsize: number;
  eslint: EmbbedBoolean;
  expanddevtools: EmbbedBoolean;
  fontsize: number;
  forcerefresh: EmbbedBoolean;
  hidedevtools: EmbbedBoolean;
  highlights: number[];
  initialpath: string;
  module: string;
  moduleview: EmbbedBoolean;
  previewwindow: "browser" | "console" | "tests";
  runonclick: EmbbedBoolean;
  theme: "dark" | "light";
  view: "editor" | "preview" | "split";
}>;

export interface ICodeSandboxProps {
  /** CodeSandbox id */
  codeSandboxId: string;
  embedOptions?: EmbedOptions;
  readonly?: boolean;
  size?: string;
}

export const CodeSandbox = ({
  codeSandboxId,
  embedOptions,
  readonly,
  size,
}: ICodeSandboxProps): ReactElement => {
  const allOptions: EmbedOptions = {
    autoresize: "1",
    fontsize: 11,
    ...embedOptions,
  };

  const optionsQueryString = Object.keys(allOptions)
    .map((k) => `${k}=${allOptions[k as keyof EmbedOptions]}`)
    .join("&");

  return (
    <HideUntilInViewport fallback={<div style={{ height: size || "500px" }} />}>
      <iframe
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts"
        src={`https://codesandbox.io/embed/${codeSandboxId}?${optionsQueryString}`}
        style={{
          border: 0,
          borderRadius: "4px",
          height: size || "500px",
          overflow: "hidden",
          pointerEvents: readonly ? "none" : "auto",
          width: "100%",
        }}
        title={`codeSandbox-${codeSandboxId}`}
      />
    </HideUntilInViewport>
  );
};
