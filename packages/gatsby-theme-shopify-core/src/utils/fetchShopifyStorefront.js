const fetchShopifyStorefront = ({shopName, accessToken, endpoint, query, variables, api = '2019-07'}) => {
  const url = endpoint || `https://${shopName}.myshopify.com/api/graphql`
  const body = JSON.stringify(Object.assign({query}, {variables}))
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body,
  })
}

export default fetchShopifyStorefront
