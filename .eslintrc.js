module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  // plugins: 'prettier',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 'prettier/prettier': 'error',
    'no-undef': 'error',
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
  },
};
