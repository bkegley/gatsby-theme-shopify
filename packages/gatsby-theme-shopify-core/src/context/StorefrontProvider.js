import React from 'react'

export const StorefrontContext = React.createContext()

const StorefrontProvider = ({shopName, storefrontAccessToken, endpoint, children}) => {
  if ((!endpoint && !shopName) || !storefrontAccessToken) {
    throw new Error(`Either an endpoint or shopName and storefrontAccessToken are required`)
  }
  const value = React.useMemo(() => ({shopName, storefrontAccessToken, endpoint}), [
    shopName,
    storefrontAccessToken,
    endpoint,
  ])
  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export default StorefrontProvider
