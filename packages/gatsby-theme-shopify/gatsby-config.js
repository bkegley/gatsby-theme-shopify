module.exports = themeOptions => {
  return {
    __experimentalThemes: [
      // 'gatsby-theme-ui'
    ],
    plugins: [
      'gatsby-plugin-emotion',
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['gatsby-theme-shopify'],
        },
      },
    ],
  }
}
