const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = withNativeWind(
  mergeConfig(getDefaultConfig(__dirname), config),
  // Stitch's Tailwind source uses a 16px root; NativeWind defaults to 14px.
  { input: './global.css', inlineRem: 16 },
);
