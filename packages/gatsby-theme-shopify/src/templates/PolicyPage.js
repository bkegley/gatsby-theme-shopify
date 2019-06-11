import React from 'react'
import PolicyPage from '../components/PolicyPage'
import {graphql} from 'gatsby'

const PolicyPageWrapper = props => {
  return <PolicyPage {...props} />
}

export const query = graphql`
  query shopifyShopPolicy($id: String!) {
    shopifyShopPolicy(id: {eq: $id}) {
      id
      title
      body
    }
  }
`

export default PolicyPageWrapper
