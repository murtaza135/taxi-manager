module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', {
      "ignoreRestSiblings": true,
      "destructuredArrayIgnorePattern": "[A-Za-z]",
      "args": "all",
      "argsIgnorePattern": "^_",
      "caughtErrors": "all",
      "caughtErrorsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
    }],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': ['error', {
      'ImportDeclaration': { 'multiline': true, 'minProperties': 8 },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 8 }
    }],
    'react/jsx-props-no-spreading': "off",
    'react/require-default-props': "off",
    "react/prop-types": "off",
    "max-len": ["error", { "code": 100, "ignoreStrings": true, "ignoreComments": true }],
    "@typescript-eslint/no-misused-promises": ["error", { "checksVoidReturn": false }],
    "@typescript-eslint/indent": "off",
    "indent": "off",
  },
  settings: {
    "import/resolver": {
      node: { moduleDirectory: ["node_modules", "./src"] }
    }
  }
};
