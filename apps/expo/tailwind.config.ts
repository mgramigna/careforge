// @ts-expect-error - no types
import nativewind from 'nativewind/preset';
import { type Config } from 'tailwindcss';

import baseConfig from '@canvas-challenge/tailwind-config';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [baseConfig, nativewind],
} satisfies Config;
