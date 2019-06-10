exports.createPages = ({graphql, actions}, themeOptions) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    // ==== CREATE POLICY PAGES ====
    graphql(`
      {
        allShopifyShopPolicy {
          edges {
            node {
              id
              title
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
        const handle = edge.node.title
          .toLowerCase()
          .split(' ')
          .join('-')
        createPage({
          path: `/policies/${handle}/`,
          component: require.resolve(`./src/templates/PolicyPage.js`),
          context: {
            id: edge.node.id,
          },
        })
      })
    })

    // ==== END POLICY PAGES ====

    resolve()
  })
}
