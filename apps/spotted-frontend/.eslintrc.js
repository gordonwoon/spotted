module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['solid', '@typescript-eslint'],
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['apps/spotted-frontend/tsconfig.*?.json'],
      },
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
  settings: {
    'solid/typescript': require('typescript'),
  },
  env: {
    webextensions: true,
  },
};
