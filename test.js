import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-config-prettier';
import nextCoreWebVitalsConfig from 'eslint-config-next';

/** @type {import('eslint').Linter.Config} */
export default [
  {
    plugins: [perfectionist, 'fsd-import', '@ts-safeql/eslint-plugin'],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      'fsd-import/fsd-relative-path': 'error',
      'fsd-import/public-api-imports': 'error',
      'fsd-import/layer-imports': 'error',
      '@ts-safeql/check-sql': [
        'error',
        {
          connections: [
            {
              // The migrations path:
              connectionUrl: process.env.NEW_DATABASE_URL,
              migrationsDir: './prisma/migrations',
              targets: [
                // This makes `prisma.$queryRaw` and `prisma.$executeRaw` commands linted
                {
                  tag: 'prisma.+($queryRaw|$executeRaw)',
                  transform: '{type}[]',
                },
              ],
            },
          ],
        },
      ],
    },
    extends: [
      nextCoreWebVitalsConfig,
      perfectionistNatural,
      eslintConfigPrettier,
    ],
  },
];
