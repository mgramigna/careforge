// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'Careforge',
  slug: 'careforge',
  scheme: 'expo',
  version: '0.2.0',
  orientation: 'portrait',
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#F5F7FA',
  },
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.careforge.app',
    supportsTablet: true,
  },
  android: {
    package: 'com.careforge.app',
  },
  extra: {
    eas: {
      projectId: 'b7b22a3e-0562-4094-ab36-1e9a28152ec6',
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ['expo-router', './expo-plugins/with-modify-gradle.js'],
});

export default defineConfig;
