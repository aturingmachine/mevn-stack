module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    node: true,
  },
  ignorePatterns: ['dist/**'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
}
