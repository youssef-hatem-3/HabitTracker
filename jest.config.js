module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-.*|nativewind|lucide-react-native)/)',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/jest/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': 'babel-jest',
  },
};
