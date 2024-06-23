module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  globals: {
    React: true,
    JSX: true
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    indent: 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        printWidth: 80,
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        tabWidth: 2,
        endOfLine: 'auto',
        arrowParens: 'avoid'
      }
    ],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-await-in-loop': 'error',
    'no-console': 'error',
    'no-promise-executor-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'require-atomic-updates': 'error',
    'accessor-pairs': 'error',
    'brace-style': 'error',
    'no-use-before-define': 'off',
    'object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/semi': ['off'],
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/ban-types": 'off',
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true
      }
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off'
  }
}
