import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react,
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                alias: {
                    map: [['~', './src']],
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,

            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': 'off',
            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
            'react/prop-types': 0,
            'react/display-name': 0,
            'no-console': 1,

            'react/no-children-prop': 0,
            'no-undef': 0,
        },
    },
];
