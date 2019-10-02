# gatsby-theme-shopify

`gatsby-theme-shopify` is a Gatsby theme for quickly bootstrapping a static Shopify site. The theme extracts the Gatsby configuration for loading Shopify assets and provides functionality for managing customers and a shopping cart.

- [gatsby-theme-shopify](#gatsby-theme-shopify)
  - [Motivation](#motivation)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
    - [Options](#options)
    - [Shadowing](#shadowing)
  - [Hooks](#hooks)
    - [`useCart`](#usecart)
    - [`useCustomer`](#usecustomer)
    - [`useStorefront`](#usestorefront)

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

| Key           | Default                                               | Description                                                                       |
| ------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| `shopName`    | none                                                  | Shopify shop name (e.g. my-site)                                                  |
| `accessToken` | none                                                  | Shopify Storefront access token                                                   |
| `modules`     | `['products', 'collections', 'articles', 'policies']` | Allows filtering certain items from Shopify (see configuration below)             |
| `endpoint`    | none                                                  | Allows adding a custom graphql endpoint (must extend Shopify Storefront endpoint) |

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

`gatsby-theme-shopify` is comprised of two themes - `gatsby-theme-shopify-core` and `gatsby-theme-shopify`. The core theme is responsible for data fetching and page creation. `gatsby-theme-shopify` is a lightly styled layer over core utilizing [Theme UI](https://theme-ui.com).

```txt
└── src
    ├── components
    │   ├── Account.js
    │   ├── ArticleListPage.js
    │   ├── ArticlePage.js
    │   ├── AuthenticatedRoute.js
    │   ├── CollectionPage.js
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── Layout.js
    │   ├── Login.js
    │   ├── PaginationNavbar.js
    │   ├── PolicyPage.js
    │   ├── ProductCard.js
    │   ├── ProductListPage.js
    │   ├── ProductPage.js
    │   └── Sidebar.js
    ├── pages
    │   ├── 404.js
    │   ├── account.js
    │   ├── cart.js
    │   ├── index.js
    │   └── search.js
    └── theme.js
```

## Hooks

`gatsby-theme-shopify` exports three hooks to help build your site.

### `useCart`

`useCart` provides a cart object and functions to add/modify/remove items from the cart and create a checkout. For a detailed explanation for using cart functions see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usecart).

```js
const {cart, addToCart, updateCartLineItem, removeCartLineItem, emptyCart, createCheckout} = useCart()
```

### `useCustomer`

`useCustomer` manages customer logged in state with functions for logging in/out and updating their password. For a detailed explanation for using customer functions see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usecustomer).

```js
const {loading, error, data, login, logout, updatePassword} = useCustomer()
```

### `useStorefront`

```js
const {loading, error, data} = useStorefront()
```

`useStorefront` allows for one-off queries or mutations to the Shopify Storefront API. This can be especially useful for retrieving data that should be dynamic (such as inventory quantities). For a detailed explanation for see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usestorefront).
