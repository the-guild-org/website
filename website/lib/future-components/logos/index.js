import { jsx } from 'react/jsx-runtime';
import { cn } from '../cn';
import { ReactComponent } from './angular';
import { ReactComponent as ReactComponent3 } from './conductor';
import { ReactComponent as ReactComponent4 } from './config';
import { ReactComponent as ReactComponent5 } from './fets';
import { ReactComponent as ReactComponent7 } from './heltin';
import { ReactComponent as ReactComponent8 } from './kitql';
import { ReactComponent as ReactComponent10 } from './modules';
import { ReactComponent as ReactComponent11 } from './nextra';
import { ReactComponent as ReactComponent12 } from './sse';
import { ReactComponent as ReactComponent13 } from './stitching';
import { ReactComponent as ReactComponent15 } from './tools';
import { ReactComponent as ReactComponent16 } from './whatsapp';
import { ReactComponent as ReactComponent17 } from './ws';

const createLettermarkLogo = text => {
  const LettermarkLogo = props => {
    return /* @__PURE__ */ jsx('span', {
      role: 'img',
      ...props,
      className: cn('inline-flex items-center justify-center text-xs font-medium', props.className),
      children: text,
    });
  };
  return LettermarkLogo;
};
const InspectorLettermark = createLettermarkLogo('INS');
const SofaLettermark = createLettermarkLogo('SOF');
const GraphQLESlintLettermark = createLettermarkLogo('ESL');
const EnvelopLettermark = createLettermarkLogo('ENV');
const ScalarsLettermark = createLettermarkLogo('SCL');
const ConductorLettermark = createLettermarkLogo('CON');
const StitchingLettermark = createLettermarkLogo('STI');
const ToolsLettermark = createLettermarkLogo('TLS');
const ModulesLettermark = createLettermarkLogo('MOD');
const ConfigLettermark = createLettermarkLogo('CFG');
const FetsLettermark = createLettermarkLogo('FTS');
const AngularLettermark = createLettermarkLogo('ANG');
const KitQLLettermark = createLettermarkLogo('KQL');
const WSLettermark = createLettermarkLogo('WS');
const SSELettermark = createLettermarkLogo('SSE');
const HeltinLettermark = createLettermarkLogo('HLT');
const WhatsAppLettermark = createLettermarkLogo('WHA');
export {
  AngularLettermark,
  ReactComponent as AngularLogo,
  ConductorLettermark,
  ReactComponent3 as ConductorLogo,
  ConfigLettermark,
  ReactComponent4 as ConfigLogo,
  EnvelopLettermark,
  FetsLettermark,
  ReactComponent5 as FetsLogo,
  GraphQLESlintLettermark,
  HeltinLettermark,
  ReactComponent7 as HeltinLogo,
  InspectorLettermark,
  KitQLLettermark,
  ReactComponent8 as KitQLLogo,
  ModulesLettermark,
  ReactComponent10 as ModulesLogo,
  ReactComponent11 as NextraLogo,
  SSELettermark,
  ReactComponent12 as SSELogo,
  ScalarsLettermark,
  SofaLettermark,
  StitchingLettermark,
  ReactComponent13 as StitchingLogo,
  ToolsLettermark,
  ReactComponent15 as ToolsLogo,
  WSLettermark,
  ReactComponent17 as WSLogo,
  WhatsAppLettermark,
  ReactComponent16 as WhatsAppLogo,
};
