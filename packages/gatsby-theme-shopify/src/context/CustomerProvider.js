import React from 'react'

export const CustomerContext = React.createContext()

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const customerReducer = (cart, action) => {
  switch (action.type) {
    case LOGIN: {
    }
    case LOGOUT: {
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

  const login = ({username, password}) => {
    dispatch({type: LOGIN, username, password})
  }

  const logout = () => {
    dispatch({type: LOGOUT})
  }

  const value = React.useMemo(() => ({customer, login, logout}), [customer])

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export default CustomerProvider
