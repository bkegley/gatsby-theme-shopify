# gatsby-theme-shopify

`gatsby-theme-shopify` is a Gatsby theme for quickly bootstrapping a static Shopify site. The theme extracts the Gatsby configuration for loading Shopify assets and provides functionality for managing customers and a shopping cart.

## Motivation

Creating static Shopify sites is quite a bit easier with Gatsby and `gatsby-source-shopify`. However, scaffolding out page creation, cart management, and authenticating/managing users can be get complicated. The goal of `gatsby-theme-shopify` is to extract all the nitty-gritty configuration necessary for a fully-featured static Shopify site leaving you to create beautiful ecommerce sites.

## Getting Started

Install the theme and necessary peer dependencies:

```sh
yarn add gatsby-theme-shopify gatsby react react-dom
```

## Usage

Edit `gatsby-config.js` to include `gatsby-theme-shopify`:

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-shopify`,
      options: {
        shopName: `my-site`,
        accessToken: `123456789`,
      },
    },
  ],
}
```

### Options

| Key           | Default                                               | Description                                                           |
| ------------- | ----------------------------------------------------- | --------------------------------------------------------------------- |
| `shopName`    | none                                                  | Shopify shop name (e.g. my-site)                                      |
| `accessToken` | none                                                  | Shopify Storefront access token                                       |
| `modules`     | `['products', 'collections', 'articles', 'policies']` | Allows filtering certain items from Shopify (see configuration below) |

**`modules`**

It's possible that you would want to filter certain items (such as wholesale products) during the build pipeline. `modules` gives you control over GraphQL queries during `gatsby-node`'s `createPages` lifecycle. The default build s the site with all nodes from all content types (products, collections, articles, and policies). `modules` accepts an array of either strings or objects with a key fo the content type. Objects can set `filter` and `sort`.

```js
// gatsby-config.js
module.exports = {
    plugins: [
        {
            resolve: `gatsby-theme-shopify`,
            options: {
                shopName: `my-site`,
                accessToken: `123456789`
                modules: [
                    'collections',
                    'articles',
                    {
                        products: {
                            filter: {tags:{in:["include"]}}
                            sort: {fields: "title"}
                        }
                    }
                ]
            }
        }
    ]
}
```

### Shadowing

## Hooks

`gatsby-theme-shopify` exports three hooks to help build your site.

### useCart

Stub for using `useCart` hook

### useCustomer

Stub for using `useCustomer` hook
