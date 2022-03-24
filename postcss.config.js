module.exports = {
  plugins: [
    'autoprefixer',
    'tailwindcss',
    'postcss-flexbugs-fixes',
    'postcss-import',
    ...(process.env.NODE_ENV === 'production'
      ? [['cssnano', { preset: 'default' }]]
      : []),
    'postcss-preset-env',
  ],
}
