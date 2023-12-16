// @ts-expect-error - no types
import nativewind from 'nativewind/preset';
import { type Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

import baseConfig from '@careforge/tailwind-config';

import { palette } from './src/theme/colors';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [baseConfig, nativewind],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      transparent: 'transparent',
      ...palette,
    },
    extend: {
      fontFamily: {
        'open-sans': 'OpenSans_400Regular',
        'open-sans-bold': 'OpenSans_700Bold',
        'open-sans-italic': 'OpenSans_400Regular_Italic',
        'open-sans-light': 'OpenSans_300Light',
        'open-sans-light-italic': 'OpenSans_300Light_Italic',
        'open-sans-bold-italic': 'OpenSans_700Bold_Italic',
      },
    },
  },
} satisfies Config;
