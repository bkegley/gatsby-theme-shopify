const fetchShopifyStorefront = ({shopName, storefrontAccessToken, query, variables, api = '2019-07'}) => {
  const url = `https://${shopName}.myshopify.com/api/graphql`
  const body = JSON.stringify(Object.assign({query}, {variables}))
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body,
  })
}

export default fetchShopifyStorefront
