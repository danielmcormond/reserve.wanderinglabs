module.exports = {
  extends: 'prettier',
  plugins: ["prettier"],

  rules: {
    "prettier/prettier": ["error"],
    'import/no-extraneous-dependencies': false,
    'no-console': 'off'
  },
};
