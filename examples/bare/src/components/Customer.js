import React from 'react'
import {useStorefront} from 'gatsby-theme-shopify-core'

const customerQuery = `query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
      updatedAt
    }
  }`

const Customer = ({accessToken}) => {
  const customer = useStorefront({query: customerQuery, variables: {customerAccessToken: accessToken}})

  return (
    <div>
      <h1>Customer</h1>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
    </div>
  )
}

export default Customer
