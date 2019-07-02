import React from 'react'
import CartProvider from './CartProvider'
import CustomerProvider from './CustomerProvider'

const ShopifyProvider = ({children, shopName, storefrontAccessToken}) => {
  if (!shopName || !storefrontAccessToken) {
    throw new Error(`shopName and storefrontAccessToken are required`)
  }
  return (
    <CartProvider>
      <CustomerProvider shopName={shopName} storefrontAccessToken={storefrontAccessToken}>
        {children}
      </CustomerProvider>
    </CartProvider>
  )
}

export default ShopifyProvider
