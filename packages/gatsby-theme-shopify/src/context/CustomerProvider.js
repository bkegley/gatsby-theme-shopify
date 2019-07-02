import React from 'react'

export const CustomerContext = React.createContext()

const fetchShopifyStorefront = ({shopName, storefrontAccessToken, query, api = '2019-07'}) => {
  const url = `https://${shopName}.myshopify.com/api/graphql`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: query,
  })
}

const buildLoginMutation = ({email, password}) => `
  mutation {
    customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const buildLogoutMutation = ({customerAccessToken}) => `
  mutation {
    customerAccessTokenDelete(customerAccessToken: "${customerAccessToken}") {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const customerReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.customerAccessTokenCreate,
      }
    }
    case LOGOUT: {
      return {}
    }
    default: {
      throw new Error(`Provide a valid action type`)
    }
  }
}

const initialState =
  typeof window === 'undefined' || !window.localStorage.getItem('customer')
    ? {}
    : JSON.parse(window.localStorage.getItem('customer'))

const CustomerProvider = ({children, shopName, storefrontAccessToken}) => {
  const [customer, dispatch] = React.useReducer(customerReducer, initialState)

  React.useEffect(() => {
    window.localStorage.setItem('customer', JSON.stringify(customer))
  }, [customer])

  const login = async ({email, password} = {}) => {
    if (!email || !password) {
      throw new Error(`email and password are required`)
    }

    const {data} = await fetchShopifyStorefront({
      shopName: shopName,
      storefrontAccessToken: storefrontAccessToken,
      query: buildLoginMutation({email: email, password: password}),
    }).then(res => res.json())

    dispatch({type: LOGIN, customerAccessTokenCreate: data.customerAccessTokenCreate})
  }

  const logout = async () => {
    if (!customer.customerAccessToken || !customer.customerAccessToken.accessToken) {
      throw new Error(`User must be logged in before logging out`)
    }
    const {data} = await fetchShopifyStorefront({
      shopName: shopName,
      storefrontAccessToken: storefrontAccessToken,
      query: buildLogoutMutation({customerAccessToken: customer.customerAccessToken.accessToken}),
    }).then(res => res.json())

    if (data.customerAccessTokenDelete.userErrors && data.customerAccessTokenDelete.userErrors.length) {
      throw new Error(`There was an issue logging the user out`)
    }
    dispatch({type: LOGOUT})
  }

  const value = React.useMemo(() => ({customer, login, logout}), [customer])

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export default CustomerProvider
