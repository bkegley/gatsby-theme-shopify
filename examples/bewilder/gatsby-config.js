require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-shopify-bewilder',
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ],
}
