import React from 'react'
import CartProvider from './CartProvider'
import CustomerProvider from './CustomerProvider'
import StorefrontProvider from './StorefrontProvider'

const ShopifyProvider = ({children, shopName, accessToken, endpoint}) => {
  if ((!endpoint && !shopName) || !accessToken) {
    throw new Error(`Either an endpoint or shopName and accessToken are required`)
  }
  return (
    <CartProvider shopName={shopName} accessToken={accessToken} endpoint={endpoint}>
      <StorefrontProvider shopName={shopName} accessToken={accessToken} endpoint={endpoint}>
        <CustomerProvider shopName={shopName} accessToken={accessToken} endpoint={endpoint}>
          {children}
        </CustomerProvider>
      </StorefrontProvider>
    </CartProvider>
  )
}

export default ShopifyProvider
