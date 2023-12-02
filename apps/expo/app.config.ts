import { type ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'expo',
  slug: 'expo',
  scheme: 'expo',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'your.bundle.identifier',
    supportsTablet: true,
  },
  android: {
    package: 'your.bundle.identifier',
    adaptiveIcon: {
      // foregroundImage: './assets/icon.png',
      // backgroundColor: '#1F104A',
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ['expo-router', './expo-plugins/with-modify-gradle.js'],
});

export default defineConfig;
