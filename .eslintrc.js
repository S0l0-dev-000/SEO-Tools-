module.exports = {
  extends: ['next/core-web-vitals'],
  ignorePatterns: [
    'src/generated/**/*',
    'node_modules/**/*',
    '.next/**/*',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-require-imports': 'error',
  },
}; 