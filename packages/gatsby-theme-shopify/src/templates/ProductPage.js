import React from 'react'
import {graphql} from 'gatsby'
import ProductPage from '../components/ProductPage'

const ProductPageWrapper = props => {
  return <ProductPage {...props} />
}

export const query = graphql`
  query getProductInfo($id: String!) {
    shopifyProduct(id: {eq: $id}) {
      title
      description
      options {
        id
        name
        values
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
      options {
        id
        name
        values
      }
      variants {
        shopifyId
        fields {
          shopifyAdminId
        }
        title
        price
        selectedOptions {
          name
          value
        }
        image {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`

export default ProductPageWrapper
