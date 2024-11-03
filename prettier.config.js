import prettierConfig from '@theguild/prettier-config';
import prettierTailwindPlugin from 'prettier-plugin-tailwindcss'

export default {
  ...config,
  plugins: [...prettierConfig.plugins, prettierTailwindPlugin],
};
