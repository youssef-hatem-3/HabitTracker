/* eslint-env node */

const { execFileSync } = require('node:child_process');
const { StyleSheet } = require('react-native-css-interop');
const {
  cssToReactNativeRuntime,
} = require('react-native-css-interop/css-to-rn');

module.exports = function registerNativeWindStyles() {
  // NativeWind deliberately leaves native component registration to tests.
  require('react-native-css-interop/dist/runtime/components');
  const css = execFileSync(
    process.execPath,
    [require.resolve('tailwindcss/lib/cli.js'), '--input', 'global.css'],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NATIVEWIND_OS: 'ios',
        BROWSERSLIST_IGNORE_OLD_DATA: 'true',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );
  StyleSheet.registerCompiled(cssToReactNativeRuntime(css, { inlineRem: 16 }));
};
