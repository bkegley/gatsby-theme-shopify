const createModuleObject = (modules = ['articles', 'policies', 'products', 'collections']) => {
  const defaultModule = {
    filter: {},
    sort: null,
  }

  return Object.assign(
    ...modules.map(moduleItem => {
      return typeof moduleItem === 'string' ? {[moduleItem]: defaultModule} : Object.assign(defaultModule, moduleItem)
    }),
  )
}

exports.createPages = ({graphql, actions}, themeOptions) => {
  const {createPage} = actions

  const {articlesPerPage = 6, productsPerPage = 12, modules} = themeOptions

  const moduleObject = createModuleObject(modules)

  return new Promise((resolve, reject) => {
    if (moduleObject.articles) {
      // ==== ARTICLE PAGES (SHOPIFY) ====
      graphql(
        `
          query allShopifyArticle($filter: ShopifyArticleFilterInput, $sort: ShopifyArticleSortInput) {
            allShopifyArticle(filter: $filter, sort: $sort) {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
        moduleObject.articles,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const articles = result.data.allShopifyArticle.edges

        articles.map(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: require.resolve(`./src/templates/ArticlePage.js`),
            context: {
              id: edge.node.id,
            },
          })
        })

        const numberOfPages = Math.ceil(articles.length / articlesPerPage)

        Array.from({length: numberOfPages}).map((_, i) => {
          createPage({
            path: i === 0 ? '/articles' : `articles/${i + 1}`,
            component: require.resolve(`./src/templates/ArticleListPage.js`),
            context: {
              limit: articlesPerPage,
              skip: i * articlesPerPage,
              filter: moduleObject.articles.filter,
              sort: moduleObject.articles.sort,
              pageNumber: i + 1,
              numberOfPages,
            },
          })
        })
      })
      // ==== END ARTICLE PAGES (SHOPIFY) ====
    }

    if (moduleObject.policies) {
      // ==== CREATE POLICY PAGES ====
      graphql(`
        query allShopifyShopPolicy($filter: ShopifyShopPolicyFilterInput, $sort: ShopifyShopPolicySortInput) {
          allShopifyShopPolicy(filter: $filter, sort: $sort) {
            edges {
              node {
                id
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
        result.data.allShopifyShopPolicy.edges.map(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: require.resolve(`./src/templates/PolicyPage.js`),
            context: {
              id: edge.node.id,
            },
          })
        })
      })
      // ==== END POLICY PAGES ====
    }

    if (moduleObject.products) {
      // ==== PRODUCT PAGES (SHOPIFY) ====
      graphql(
        `
          query allShopifyProduct($filter: ShopifyProductFilterInput, $sort: ShopifyProductSortInput) {
            allShopifyProduct(filter: $filter, sort: $sort) {
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
        `,
        moduleObject.products,
      ).then(result => {
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
            path: i === 0 ? '/products' : `/products/${i + 1}`,
            component: require.resolve(`./src/templates/ProductListPage.js`),
            context: {
              limit: productsPerPage,
              skip: i * productsPerPage,
              filter: moduleObject.products.filter,
              sort: moduleObject.products.sort,
              pageNumber: i + 1,
              numberOfProductListPages,
            },
          })
        })
      })
      // ==== END PRODUCT PAGES (SHOPIFY) ====
    }

    if (moduleObject.collections) {
      // ==== COLLECTION PAGES (SHOPIFY) ====
      graphql(`
        query allShopifyCollection($filter: ShopifyCollectionFilterInput, $sort: ShopifyCollectionSortInput) {
          allShopifyCollection(filter: $filter, sort: $sort) {
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
    }

    resolve()
  })
}

exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === 'ShopifyProduct') {
    createNodeField({
      name: 'slug',
      node,
      value: `/products/${node.handle}`,
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
      value: `/collections/${node.handle}`,
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

  if (node.internal.type === `ShopifyArticle`) {
    const handle = node.url.split('/')[node.url.split('/').length - 1]
    createNodeField({
      name: `slug`,
      node,
      value: `/articles/${handle}`,
    })
  }

  if (node.internal.type === `ShopifyShopPolicy`) {
    const handle = node.title
      .toLowerCase()
      .split(' ')
      .join('-')
    createNodeField({
      name: `slug`,
      node,
      value: `/policies/${handle}`,
    })
  }
}
