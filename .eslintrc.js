module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/components/ui/*/*', '@/features/*/*'],
            message: 'Import another module through its public index.ts API.',
          },
        ],
      },
    ],
  },
};
