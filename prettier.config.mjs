import prettierTailwindPlugin from 'prettier-plugin-tailwindcss';
import prettierConfig from '@theguild/prettier-config';

export default {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, prettierTailwindPlugin],
};
