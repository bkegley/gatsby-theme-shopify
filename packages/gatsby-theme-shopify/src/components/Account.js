import React from 'react'
import {useStorefront} from 'gatsby-theme-shopify-core'

const customerQuery = `query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
      displayName
      updatedAt
    }
  }`

const Account = ({accessToken}) => {
  const {loading, error, data} = useStorefront({query: customerQuery, variables: {customerAccessToken: accessToken}})
  if (loading || !data) return null
  if (error) return <div>Error!</div>
  const {customer} = data
  return (
    <div>
      <h1>Hello, {customer.displayName}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Account
