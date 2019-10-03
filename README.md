# gatsby-theme-shopify

`gatsby-theme-shopify` is a Gatsby theme for quickly bootstrapping a static Shopify site. The theme extracts the Gatsby configuration for loading Shopify assets and provides functionality for managing customers and a shopping cart.

<!-- prettier-ignore-start -->
  - [Motivation](#motivation)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
    - [Options](#options)
    - [Shadowing](#shadowing)
  - [Hooks](#hooks)
    - [`useCart`](#usecart)
    - [`useCustomer`](#usecustomer)
    - [`useStorefront`](#usestorefront)
<!-- prettier-ignore-end -->


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

It's possible that you would want to filter certain items (such as wholesale products) during the build pipeline. `modules` gives you control over GraphQL queries during `gatsby-node`'s `createPages` lifecycle. The default builds the site with all nodes from all content types (products, collections, articles, and policies). `modules` accepts an array of either strings or objects with a key of the content type. Objects can set `filter` and `sort`.

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

`gatsby-theme-shopify` is comprised of two themes - `gatsby-theme-shopify-core` and `gatsby-theme-shopify`. The core theme is responsible for data fetching and page creation. `gatsby-theme-shopify` is a lightly styled layer over core utilizing [Theme UI](https://theme-ui.com). The intention is that these files would be shadowed in creating your own Shopify store.

**File Tree**

The following is the file tree for `gatsby-theme-shopify` to allow component shadowing.

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

```js
import {useCart, useCustomer, useStorefront} from 'gatsby-theme-shopify'
```

### `useCart`

`useCart` provides a cart object and functions to add/modify/remove items from the cart and create a checkout. For a detailed explanation for using cart functions see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usecart).

<!-- prettier-ignore-start -->
```js
  const {
    cart,
    addToCart,
    updateCartLineItem,
    removeCartLineItem,
    emptyCart,
    createCheckout
  } = useCart()
```
<!-- prettier-ignore-end -->

#### addToCart

Adds an additional line item to the cart.

```js
const product = {
  variantId: '12345',
  quantity: 1,
  customAttributes: [
    {
      key: 'key',
      value: 'value',
    },
  ],
  ...additionalProperties,
}

addToCart(product)
```

| Key                       | Required | Description                                                                                                                                             |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variantId`               | true     | The Shopify variant ID                                                                                                                                  |
| `quantity`                | true     | Quantity of items                                                                                                                                       |
| `customAttributes`        | false    | Additional line item properties - `[{key, value}]` - (see [here](https://help.shopify.com/en/api/storefront-api/reference/input-object/attributeinput)) |
| `...additionalProperties` | false    | Any other information to store on the cart line item (e.g. the product)                                                                                 |

#### updateCartLineItem

Updates an existing line item in the cart.

```js
const product = {
  variantId: '12345',
  quantity: 2,
  customAttributes: [
    {
      key: 'key',
      value: 'value',
    },
  ],
}

updateCartLineItem(product)
```

| Key                | Required | Description                                                                                                                                             |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variantId`        | true     | The Shopify variant ID                                                                                                                                  |
| `quantity`         | true     | Quantity of items                                                                                                                                       |
| `customAttributes` | false    | Additional line item properties - `[{key, value}]` - (see [here](https://help.shopify.com/en/api/storefront-api/reference/input-object/attributeinput)) |

#### removeCartLineItem

Removes an existing line item from the cart.

```js
const product = {
  variantId: '12345',
}

removeCartLineItem(product)
```

| Key         | Required | Description            |
| ----------- | -------- | ---------------------- |
| `variantId` | true     | The Shopify variant ID |

#### emptyCart

Empties the cart

```js
emptyCart()
```

#### createCheckout

Creates a Shopify checkout from the existing cart line items. For explanation of options see [here](https://help.shopify.com/en/api/storefront-api/reference/mutation/checkoutcreate).

```js
createCheckout(options)
  .then(res => {
    // if there are errors in checkout creation
    if (res.data.checkoutCreate.checkoutUserErrors && res.data.checkoutCreate.checkoutUserErrors.length > 0) {
      // handle error
    }
    window.location.replace(res.data.checkoutCreate.checkout.webUrl)
  })
  .catch(err => console.log({err}))
```

| Key                       | Required | Description                                                                                                                                             |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowPartialAddresses`   | true     | Allow partially completed addresses before the checkout is final                                                                                        |
| `email`                   | true     | Quantity of items                                                                                                                                       |
| `note`                    | true     | Quantity of items                                                                                                                                       |
| `presentmentCurrencyCode` | true     | Quantity of items                                                                                                                                       |
| `shippingAddress`         | true     | Quantity of items                                                                                                                                       |
| `customAttributes`        | false    | Additional line item properties - `[{key, value}]` - (see [here](https://help.shopify.com/en/api/storefront-api/reference/input-object/attributeinput)) |

### `useCustomer`

`useCustomer` manages customer logged in state with functions for logging in/out and updating their password. For a detailed explanation for using customer functions see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usecustomer).

<!-- prettier-ignore-start -->
```js
  const {
    loading,
    error,
    data,
    login,
    logout,
    updatePassword
  } = useCustomer()
```
<!-- prettier-ignore-end -->

### `useStorefront`

`useCustomer` manages customer logged in state with functions for logging in/out and updating their password. For a detailed explanation for using customer functions see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usecustomer).

<!-- prettier-ignore-start -->
```js
  const {
    loading,
    error,
    data,
  } = useStorefront()
```
<!-- prettier-ignore-end -->

`useStorefront` allows for one-off queries or mutations to the [Shopify Storefront API](https://help.shopify.com/en/api/storefront-api/reference). This can be especially useful for retrieving data that should be dynamic (such as inventory quantities). For a detailed explanation for see [here](https://github.com/bkegley/gatsby-theme-shopify/tree/master/packages/gatsby-theme-shopify-core/src/context#usestorefront).
