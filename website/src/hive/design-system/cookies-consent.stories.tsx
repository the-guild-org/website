import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { CallToAction } from "./call-to-action";
import { CookiesConsent, CookiesConsentProps } from "./cookies-consent";

const meta: Meta<CookiesConsentProps> = {
  title: "Components/CookiesConsent",
  component: CookiesConsent,
  decorators: [
    hiveThemeDecorator,
    (Story) => {
      const [key, setKey] = useState(0);
      const remount = () => setKey(Math.random());

      return (
        <>
          <CallToAction
            className="m-2"
            onClick={() => {
              localStorage.removeItem("cookies");
              remount();
            }}
            variant="secondary"
          >
            Reset Cookies Consent
          </CallToAction>
          <Story key={key} />
        </>
      );
    },
  ],
};

export default meta;

export const Default: StoryObj<CookiesConsentProps> = {
  name: "CookiesConsent",
};
