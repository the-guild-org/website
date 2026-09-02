import { renderLogo, type LogoName } from "../company-logos";

/**
 * Take note that these logos may have different dimensions than logos used elsewhere.
 */
const companyLogos: Record<
  string,
  { height: number; name: LogoName; width: number }
> = {
  buffer: { height: 64, name: "BufferLogo", width: 212 },
  hemnet: { height: 64, name: "HemnetLogo", width: 212 },
  reverb: { height: 64, name: "ReverbLogo", width: 224 },
  "sound-xyz": { height: 64, name: "SoundYXZLogo", width: 193 },
  toast: { height: 64, name: "ToastLogo", width: 158 },
  trivago: { height: 64, name: "TrivagoLogo", width: 212 },
  wealthsimple: { height: 64, name: "WealthsimpleLogo", width: 212 },
};

/** Returns the logo as an SVG string. */
export function getCompanyLogo(company: string): string {
  const logo = companyLogos[company];
  if (logo) {
    return renderLogo(logo.name, { height: logo.height, width: logo.width });
  }

  throw new Error(
    `No logo found for ${company}. We have the following: (${Object.keys(companyLogos).join(", ")})`,
  );
}
