import { ComponentProps, FC } from "react";

import { cn } from "../cn";

export { default as AngularLogo } from "./angular.svg?svgr";
export { default as CodeGeneratorLogo } from "./code-generator.svg?svgr";
export { default as ConductorLogo } from "./conductor.svg?svgr";
export { default as ConfigLogo } from "./config.svg?svgr";
export { default as FetsLogo } from "./fets.svg?svgr";
export { default as GraphQLFoundationLogo } from "./graphql-foundation.svg?svgr";
export { default as GuildLogo } from "./guild.svg?svgr";
export { default as HeltinLogo } from "./heltin.svg?svgr";
export { default as HiveCombinationMark } from "./hive-combination-mark.svg?svgr";
export { default as KitQLLogo } from "./kitql.svg?svgr";
export { default as MeshLogo } from "./mesh.svg?svgr";
export { default as ModulesLogo } from "./modules.svg?svgr";
export { default as NextraLogo } from "./nextra.svg?svgr";
export { default as SSELogo } from "./sse.svg?svgr";
export { default as StitchingLogo } from "./stitching.svg?svgr";
export { default as TheGuild } from "./the-guild.svg?svgr";
export { default as ToolsLogo } from "./tools.svg?svgr";
export { default as WhatsAppLogo } from "./whatsapp.svg?svgr";
export { default as WSLogo } from "./ws.svg?svgr";
export { default as YogaLogo } from "./yoga.svg?svgr";

const createLettermarkLogo = (text: string) => {
  const LettermarkLogo: FC<ComponentProps<"span">> = (props) => {
    return (
      <span
        role="img"
        {...props}
        className={cn(
          "inline-flex items-center justify-center text-xs font-medium",
          props.className,
        )}
      >
        {text}
      </span>
    );
  };
  return LettermarkLogo;
};

export const InspectorLettermark = createLettermarkLogo("INS");
export const SofaLettermark = createLettermarkLogo("SOF");
export const GraphQLESlintLettermark = createLettermarkLogo("ESL");
export const EnvelopLettermark = createLettermarkLogo("ENV");
export const ScalarsLettermark = createLettermarkLogo("SCL");
export const ConductorLettermark = createLettermarkLogo("CON");
export const StitchingLettermark = createLettermarkLogo("STI");
export const ToolsLettermark = createLettermarkLogo("TLS");
export const ModulesLettermark = createLettermarkLogo("MOD");
export const ConfigLettermark = createLettermarkLogo("CFG");
export const FetsLettermark = createLettermarkLogo("FTS");
export const AngularLettermark = createLettermarkLogo("ANG");
export const KitQLLettermark = createLettermarkLogo("KQL");
export const WSLettermark = createLettermarkLogo("WS");
export const SSELettermark = createLettermarkLogo("SSE");
export const HeltinLettermark = createLettermarkLogo("HLT");
export const WhatsAppLettermark = createLettermarkLogo("WHA");
