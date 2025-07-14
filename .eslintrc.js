module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  ignorePatterns: [
    'node_modules/**/*',
    '.next/**/*',
    'dist/**/*',
    'build/**/*',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-unescaped-entities': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
  },
}; 