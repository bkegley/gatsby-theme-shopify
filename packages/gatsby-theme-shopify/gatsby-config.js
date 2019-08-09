module.exports = themeOptions => {
  const {shopName, accessToken} = themeOptions

  return {
    siteMetadata: {
      title: 'Gatsby Theme Shopify',
    },
    plugins: [
      {
        resolve: 'gatsby-theme-shopify-core',
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
      {
        resolve: 'gatsby-plugin-page-creator',
        options: {
          path: `${__dirname}/src/pages`,
        },
      },
      {
        resolve: 'gatsby-plugin-create-client-paths',
        options: {
          prefixes: ['/account/*'],
        },
      },
    ],
  }
}
