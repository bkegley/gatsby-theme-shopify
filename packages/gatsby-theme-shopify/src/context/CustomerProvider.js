import React from 'react'
import Cookie from 'js-cookie'

export const CustomerContext = React.createContext()

const fetchShopifyStorefront = ({shopName, storefrontAccessToken, query, api = '2019-07'}) => {
  const url = `https://${shopName}.myshopify.com/api/graphql`
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: query,
  })
}

const FETCH_INIT = 'FETCH_INIT'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_ERROR = 'LOGIN_ERROR'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'LOGOUT_ERROR'

const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS'
const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR'

const COOKIE_ACCESS_TOKEN = 'shopAT'

let initialState = {
  loading: true, // initialize to true to avoid content flash before checking credentials
  error: null,
  data: null,
  checkedCredentials: false,
}

const renewAccessTokenMutation = {
  query: `mutation customerAccessTokenRenew($customerAccessToken: String!){
          customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            userErrors {
              field
              message
            }
          }
        }`,
}

const loginMutation = {
  query: `mutation customerAccessTokenCreate($email: String!, $password: String!) {
        customerAccessTokenCreate(input: {email: $email, password: $password}) {
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
      }`,
}

const logoutMutation = {
  query: `mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }`,
}

const updatePasswordMutation = {
  query: `mutation customerUpdate($customerAccessToken: String! $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken customer: $customer) {
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
    }`,
}

function reducer(state, action) {
  switch (action.type) {
    case FETCH_INIT: {
      return {
        ...state,
        loading: true,
      }
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
        checkedCredentials: true,
      }
    }

    case FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.data,
        error: null,
      }
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        data: null,
        error: action.error,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: null,
        checkedCredentials: true,
      }
    }

    case LOGOUT_ERROR: {
      return {
        ...state,
        logout: false,
        error: action.error,
        data: null,
      }
    }

    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        checkedCredentials: true,
        error: null,
        data: action.data,
      }
    }

    case UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    default: {
      throw new Error('Please provide a valid action type')
    }
  }
}

const CustomerProvider = ({shopName, storefrontAccessToken, children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {error, loading, data, checkedCredentials} = state

  React.useEffect(() => {
    // get access token from cookie or end effect immediately
    const customerCookieAccessToken = Cookie.get(COOKIE_ACCESS_TOKEN)
    if (!customerCookieAccessToken) {
      dispatch({type: FETCH_SUCCESS, data: null})
      return
    }

    const fetchCustomer = async () => {
      // if already checked credentials end effect immediately
      if (checkedCredentials) return

      dispatch({type: FETCH_INIT})
      const renewAccessTokenData = await fetchShopifyStorefront({
        shopName,
        storefrontAccessToken,
        query: JSON.stringify({
          ...renewAccessTokenMutation,
          variables: {customerAccessToken: customerCookieAccessToken},
        }),
      })
        .then(res => res.json())
        .then(res => res)
        .catch(err => {
          dispatch({type: FETCH_ERROR, error: err})
        })

      // if fetch errored return
      // TODO: probably do something here
      if (!renewAccessTokenData) return

      const {customerAccessToken, userErrors} = renewAccessTokenData.data.customerAccessTokenRenew

      if (userErrors && userErrors.length > 0) {
        // if token is no longer valid erase access token from provider and cookie
        Cookie.remove(COOKIE_ACCESS_TOKEN)

        dispatch({type: FETCH_ERROR, error: null})
      } else {
        // if token is valid store access token and add cookie
        Cookie.set(COOKIE_ACCESS_TOKEN, customerAccessToken.accessToken, {
          expires: new Date(customerAccessToken.expiresAt),
        })
        dispatch({
          type: FETCH_SUCCESS,
          data: customerAccessToken,
        })
      }
    }
    fetchCustomer()
  }, [])

  const value = React.useMemo(
    () => [
      {error, loading, data},
      {
        login: ({email, password} = {}) => {
          return new Promise((resolve, reject) => {
            if (!email || !password) {
              reject(new Error(`email and password are required`))
            }
            fetchShopifyStorefront({
              shopName,
              storefrontAccessToken,
              query: JSON.stringify({
                ...loginMutation,
                variables: {email, password},
              }),
            })
              .then(res => res.json())
              .then(res => {
                if (
                  res.errrors ||
                  (res.data.customerAccessTokenCreate.customerUserErrors &&
                    res.data.customerAccessTokenCreate.customerUserErrors.length > 0)
                ) {
                  dispatch({
                    type: LOGIN_ERROR,
                    error: res.errors ? res.errors : res.data.customerAccessTokenCreate.customerUserErrors,
                  })
                  resolve(res)
                } else {
                  Cookie.set(COOKIE_ACCESS_TOKEN, res.data.customerAccessTokenCreate.customerAccessToken.accessToken, {
                    expires: new Date(res.data.customerAccessTokenCreate.customerAccessToken.expiresAt),
                  })

                  dispatch({type: LOGIN_SUCCESS, data: res.data.customerAccessTokenCreate.customerAccessToken})
                  resolve(res)
                }
              })
              .catch(err => reject(err))
          })
        },
        logout: () => {
          return new Promise((resolve, reject) => {
            fetchShopifyStorefront({
              shopName,
              storefrontAccessToken,
              query: JSON.stringify({
                ...logoutMutation,
                variables: {customerAccessToken: data.accessToken},
              }),
            })
              .then(res => res.json())
              .then(res => {
                if (
                  res.errors ||
                  (res.data.customerAccessTokenDelete.userErrors &&
                    res.data.customerAccessTokenDelete.userErrors.length > 0)
                ) {
                  Cookie.remove(COOKIE_ACCESS_TOKEN)
                  dispatch({
                    type: LOGOUT_ERROR,
                    error: res.errors ? res.errors : res.data.customerAccessTokenDelete.userErrors,
                  })
                  resolve(res)
                } else {
                  Cookie.remove(COOKIE_ACCESS_TOKEN)
                  dispatch({type: LOGOUT_SUCCESS})
                  resolve(res)
                }
              })
              .catch(err => reject(err))
          })
        },
        updatePassword: password => {
          return new Promise((resolve, reject) => {
            fetchShopifyStorefront({
              shopName,
              storefrontAccessToken,
              query: JSON.stringify({
                ...updatePasswordMutation,
                variables: {customerAccessToken: data.accessToken, customer: {password}},
              }),
            })
              .then(res => res.json())
              .then(res => {
                if (
                  res.errors ||
                  (res.data.customerUpdate.customerUserErrors && res.data.customerUpdate.customerUserErrors.length > 0)
                ) {
                  dispatch({
                    type: UPDATE_PASSWORD_ERROR,
                    error: res.errors ? res.errors : res.data.customerUpdate.customerUserErrors,
                  })
                  resolve(res)
                } else {
                  Cookie.set(COOKIE_ACCESS_TOKEN, res.data.customerUpdate.customerAccessToken.accessToken)
                  dispatch({type: UPDATE_PASSWORD_SUCCESS, data: res.data.customerUpdate.customerAccessToken})
                  resolve(res)
                }
              })
              .catch(err => reject(err))
          })
        },
      },
    ],
    [state],
  )

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export default CustomerProvider
