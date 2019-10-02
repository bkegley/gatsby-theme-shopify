import React from 'react'

export const StorefrontContext = React.createContext()

const StorefrontProvider = ({shopName, accessToken, endpoint, children}) => {
  if ((!endpoint && !shopName) || !accessToken) {
    throw new Error(`Either an endpoint or shopName and accessToken are required`)
  }
  const value = React.useMemo(() => ({shopName, accessToken, endpoint}), [shopName, accessToken, endpoint])
  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>
}

export default StorefrontProvider
