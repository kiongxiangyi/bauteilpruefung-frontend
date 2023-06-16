module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, //solve - [eslint] 'module' is not defined. (no-undef)
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
