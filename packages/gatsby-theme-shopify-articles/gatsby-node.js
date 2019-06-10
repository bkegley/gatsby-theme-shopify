const path = require('path')

exports.createPages = ({graphql, actions}, themeOptions) => {
  const {createPage} = actions

  const {articlesPerPage = 6} = themeOptions

  return new Promise((resolve, reject) => {
    // ==== ARTICLE PAGES (SHOPIFY) ====
    graphql(`
      {
        allShopifyArticle {
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
            pageNumber: i + 1,
            numberOfPages,
          },
        })
      })
    })
    // ==== END ARTICLE PAGES (SHOPIFY) ====

    resolve()
  })
}

exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions
  if (node.internal.type === `ShopifyArticle`) {
    const handle = node.url.split('/')[node.url.split('/').length - 1]
    createNodeField({
      name: `slug`,
      node,
      value: `/articles/${handle}`,
    })
  }
}
