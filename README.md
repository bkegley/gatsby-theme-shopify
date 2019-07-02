# gatsby-theme-shopify

`gatsby-theme-shopify` is a Gatsby theme for quickly bootstrapping a static Shopify site. The theme extracts the Gatsby configuration for loading Shopify assets and provides functionality for managing customers and a shopping cart.

## Getting Started

### Installation
Install the necessary libraries: 

```sh
yarn add gatsby-theme-shopify gatsby react react-dom
```

### How to use

Edit `gatsby-config.js` to include `gatsby-theme-shopify`:

```js
// gatsby-config.js
module.exports = {
    __experimentalThemes: [
        {
            resolve: `gatsby-theme-shopify`,
            options: {
                shopName: `shop-name.myshopify.com`,
                accessToken: `123456789`
            }
        }
    ]
}
```

### Options

`shopName` and `accessToken` are required parameters but you may also optionally pass in a `modules` parameter for fine-tuning the Shopify build process.

### ShopifyProvider

Stub for using `<ShopifyProvider>`

### useCart

Stub for using `useCart` hook

### useCustomer

Stub for using `useCustomer` hook