import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const reactPlugin = require('./node_modules/.pnpm/node_modules/eslint-plugin-react');
const reactHooksPlugin = require('./node_modules/.pnpm/node_modules/eslint-plugin-react-hooks');
const nextPlugin = require('./node_modules/.pnpm/node_modules/@next/eslint-plugin-next');
const tseslintPlugin = require('./node_modules/.pnpm/node_modules/@typescript-eslint/eslint-plugin/dist/index.js');
const tsParser = require('./node_modules/.pnpm/node_modules/@typescript-eslint/parser/dist/index.js');

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'local/**',
      'next-env.d.ts',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...reactPlugin.configs.flat['jsx-runtime'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
    },
  },
];
