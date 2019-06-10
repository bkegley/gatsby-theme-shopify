import React from 'react'
import {graphql} from 'gatsby'
import CollectionPage from '../components/Product/CollectionPage'

const CollectionPageWrapper = props => {
  return <CollectionPage {...props} />
}

export const query = graphql`
  query getCollectionInfo($id: String!) {
    shopifyCollection(id: {eq: $id}) {
      id
      handle
      title
      description
      descriptionHtml
      products {
        id
        title
        fields {
          slug
        }
        images {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export default CollectionPageWrapper
