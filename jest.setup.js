/* eslint-env jest */

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.mock('react-native-worklets', () =>
  jest.requireActual('react-native-worklets/src/mock'),
);

global.IS_REACT_ACT_ENVIRONMENT = true;
