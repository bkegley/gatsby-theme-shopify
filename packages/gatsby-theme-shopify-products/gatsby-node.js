exports.createPages = ({graphql, actions}, themeOptions) => {
  const {createPage} = actions

  const {productsPerPage = 12} = themeOptions

  return new Promise((resolve, reject) => {
    // ==== PRODUCT PAGES (SHOPIFY) ====

    graphql(`
      {
        allShopifyProduct {
          edges {
            node {
              id
              handle
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const products = result.data.allShopifyProduct.edges

      products.map(edge => {
        createPage({
          path: edge.node.fields.slug,
          component: require.resolve(`./src/templates/ProductPage.js`),
          context: {
            id: edge.node.id,
          },
        })
      })

      const numberOfProductListPages = Math.ceil(products.length / productsPerPage)

      Array.from({length: numberOfProductListPages}).map((_, i) => {
        createPage({
          path: i === 0 ? '/shop' : `shop/${i + 1}`,
          component: require.resolve(`./src/templates/ProductListPage.js`),
          context: {
            limit: productsPerPage,
            skip: i * productsPerPage,
            pageNumber: i + 1,
            numberOfProductListPages,
          },
        })
      })
    })

    // ==== END PRODUCT PAGES (SHOPIFY) ====

    // ==== COLLECTION PAGES (SHOPIFY) ====

    graphql(`
      {
        allShopifyCollection {
          edges {
            node {
              id
              handle
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }
      result.data.allShopifyCollection.edges.map(edge => {
        createPage({
          path: edge.node.fields.slug,
          component: require.resolve(`./src/templates/CollectionPage.js`),
          context: {
            id: edge.node.id,
          },
        })
      })
    })

    // ==== END COLLECTION PAGES (SHOPIFY) ====

    resolve()
  })
}

exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === 'ShopifyProduct') {
    createNodeField({
      name: 'slug',
      node,
      value: `/shop/products/${node.handle}`,
    })

    // Shopify Admin API ids are base64 decoded strings from Storefront ids
    const decodedId = Buffer.from(node.shopifyId, 'base64').toString()
    createNodeField({
      name: 'shopifyAdminId',
      node,
      value: decodedId.split('/')[decodedId.split('/').length - 1],
    })
  }

  if (node.internal.type === 'ShopifyCollection') {
    createNodeField({
      name: 'slug',
      node,
      value: `/shop/collections/${node.handle}`,
    })
  }

  if (node.internal.type === 'ShopifyProductVariant') {
    // Shopify Admin API ids are base64 decoded strings from Storefront ids
    const decodedId = Buffer.from(node.shopifyId, 'base64').toString()
    createNodeField({
      name: 'shopifyAdminId',
      node,
      value: decodedId.split('/')[decodedId.split('/').length - 1],
    })
  }
}
