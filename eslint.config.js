// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigExpo = require('eslint-config-expo/flat');

module.exports = defineConfig([
  eslintConfigExpo, // Config base recomendada para Expo
  {
    ignores: ['dist/*', 'node_modules/*'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off', // No se necesita en React 17+
    },
  },
]);
