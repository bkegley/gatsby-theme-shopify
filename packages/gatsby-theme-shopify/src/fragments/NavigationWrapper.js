import {graphql} from 'gatsby'

export const query = graphql`
  fragment NavigationWrapperFragment on Query {
    allShopifyCollection {
      edges {
        node {
          title
          handle
          fields {
            slug
          }
        }
      }
    }
  }
`
