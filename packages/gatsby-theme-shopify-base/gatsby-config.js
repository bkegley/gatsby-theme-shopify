module.exports = themeOptions => {
  const {shopName, accessToken} = themeOptions

  return {
    siteMetadata: {
      title: 'Gatsby Theme Shopify',
    },
    plugins: [
      {
        resolve: 'gatsby-theme-shopify',
        options: {
          shopName,
          accessToken,
        },
      },
      {
        resolve: 'gatsby-plugin-compile-es6-packages',
        options: {
          modules: ['gatsby-theme-shopify-base'],
        },
      },
      'gatsby-plugin-theme-ui',
    ],
  }
}
