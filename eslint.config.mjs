import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['node_modules/'], //'./src/generated/**/*'
        linterOptions: {
            // noInlineConfig: false,
            // reportUnusedDisableDirectives: 'off', //supress warnings about the generated prisma code
        },
        rules: {
            // '@typescript-eslint/no-explicit-any': 'off',
            // '@typescript-eslint/no-unused-vars': 'off',
            // '@typescript-eslint/explicit-module-boundary-types': 'off',
            // '@typescript-eslint/no-inferrable-types': 'off',
        },
    },
];

export default eslintConfig;
