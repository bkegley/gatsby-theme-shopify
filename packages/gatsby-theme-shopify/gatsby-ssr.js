import React from 'react'
import {ShopifyProvider} from 'gatsby-theme-shopify-core'

export const wrapRootElement = ({element}, themeOptions) => {
  const {shopName, accessToken, endpoint} = themeOptions
  return (
    <ShopifyProvider shopName={shopName} accessToken={accessToken} endpoint={endpoint}>
      {element}
    </ShopifyProvider>
  )
}
