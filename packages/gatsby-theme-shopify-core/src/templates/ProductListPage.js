import React from 'react'
import {graphql} from 'gatsby'
import ProductListPage from '../components/ProductListPage'

const ProductListWrapper = props => {
  return <ProductListPage {...props} />
}

export const query = graphql`
  query retailProductListPageQuery(
    $filter: ShopifyProductFilterInput
    $limit: Int
    $skip: Int
    $sort: ShopifyProductSortInput
  ) {
    allShopifyProduct(filter: $filter, limit: $limit, skip: $skip, sort: $sort) {
      edges {
        node {
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
  }
`

export default ProductListWrapper
