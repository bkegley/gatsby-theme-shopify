module.exports = themeOptions => {
  const {shopName, accessToken} = themeOptions
  return {
    plugins: [
      {
        resolve: 'gatsby-source-shopify',
        options: {
          shopName,
          accessToken,
        },
      },
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['gatsby-theme-shopify-articles'],
        },
      },
      'gatsby-transformer-sharp',
      'gatsby-plugin-sharp',
    ],
  }
}
