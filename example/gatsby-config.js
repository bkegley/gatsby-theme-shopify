require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const shopName = process.env.SHOP_NAME
const accessToken = process.env.STOREFRONT_ACCESS_TOKEN
module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-shopify',
      options: {shopName, accessToken, modules: ['policies', 'products', 'collections', 'articles']},
    },
  ],
}
