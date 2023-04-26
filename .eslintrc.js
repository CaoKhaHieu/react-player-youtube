module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    // possible-errors
    'no-console': 'off',
    'no-empty-function': 'off',
    // best-practices
    curly: [2],
    'default-case': [1],
    'default-case-last': [1],
    eqeqeq: [1, 'always'],
    'no-multi-spaces': [1],
    'no-alert': [1],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['off'],

    // variables
    'no-undef-init': [2],

    // stylistic-issues
    'array-bracket-newline': [1, 'consistent'],
    'brace-style': [2],
    camelcase: [1],
    'comma-spacing': [1, { before: false, after: true }],
    'eol-last': [2, 'always'],
    'object-curly-newline': [1, { consistent: true }],
    'object-curly-spacing': [1, 'always'],
    'func-style': [0],
    quotes: [1, 'single'],
    semi: [1, 'always'],
    'semi-style': [2, 'last'],
    'no-nested-ternary': [1],
    'no-unneeded-ternary': [2],
    'no-whitespace-before-property': [2],
    'no-trailing-spaces': [1, { skipBlankLines: true }],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    '@typescript-eslint/no-var-requires': 0,

    // es 6
    'arrow-spacing': [1, { before: true, after: true }],
    'no-duplicate-imports': [1],

    // prettier
    'prettier/prettier': 'error',
  },
  ignorePatterns: ["example/"],
};
