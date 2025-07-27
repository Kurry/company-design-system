import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import htmlParser from '@html-eslint/parser';

export default [
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      // Focus on critical issues only for large files
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
      // Disable formatting rules for large showcase files
      'better-tailwindcss/sort-classes': 'off',
      'better-tailwindcss/enforce-consistent-class-order': 'off',
      'better-tailwindcss/enforce-shorthand-classes': 'off',
      'better-tailwindcss/no-unnecessary-whitespace': 'off',
    },
  },
];