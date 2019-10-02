import React from 'react'
import CartProvider from './CartProvider'
import CustomerProvider from './CustomerProvider'
import StorefrontProvider from './StorefrontProvider'

const ShopifyProvider = ({children, shopName, storefrontAccessToken, endpoint}) => {
  if ((!endpoint && !shopName) || !storefrontAccessToken) {
    throw new Error(`Either an endpoint or shopName and storefrontAccessToken are required`)
  }
  return (
    <CartProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken} endpoint={endpoint}>
      <StorefrontProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken} endpoint={endpoint}>
        <CustomerProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken} endpoint={endpoint}>
          {children}
        </CustomerProvider>
      </StorefrontProvider>
    </CartProvider>
  )
}

export default ShopifyProvider
