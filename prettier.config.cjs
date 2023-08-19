/** @type {import("prettier").Options} */
module.exports = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  proseWrap: 'always',
  printWidth: 100,
  tailwindFunctions: ['twMerge', 'twJoin'],
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
