import React from 'react'

export const StorefrontContext = React.createContext()

const StorefrontProvider = ({shopName, storefrontAccessToken, children}) => {
  if (!shopName || !storefrontAccessToken) {
    throw new Error(`shopName and storefrontAccessToken are required`)
  }
  const value = React.useMemo(() => ({shopName, storefrontAccessToken}), [shopName, storefrontAccessToken])
  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export default StorefrontProvider
