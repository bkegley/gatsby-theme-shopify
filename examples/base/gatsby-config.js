require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const shopName = process.env.GATSBY_SHOP_NAME
const accessToken = process.env.GATSBY_STOREFRONT_ACCESS_TOKEN
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-shopify',
      options: {
        shopName,
        accessToken,
      },
    },
  ],
}
