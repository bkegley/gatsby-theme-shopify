import React from 'react'
import {useCart, useCustomer} from 'gatsby-theme-shopify'

const IndexPage = () => {
  const cart = useCart()
  console.log({cart})
  const customer = useCustomer()
  console.log({customer})
  return (
    <div>
      <h2>This is the home page</h2>
    </div>
  )
}

export default IndexPage
