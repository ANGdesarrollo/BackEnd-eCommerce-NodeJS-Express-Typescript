module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
};
