import React from 'react'
import CartProvider from './CartProvider'
import CustomerProvider from './CustomerProvider'
import StorefrontProvider from './StorefrontProvider'

const ShopifyProvider = ({children, shopName, storefrontAccessToken}) => {
  if (!shopName || !storefrontAccessToken) {
    throw new Error(`shopName and storefrontAccessToken are required`)
  }
  return (
    <CartProvider>
      <StorefrontProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken}>
        <CustomerProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken}>
          {children}
        </CustomerProvider>
      </StorefrontProvider>
    </CartProvider>
  )
}

export default ShopifyProvider
