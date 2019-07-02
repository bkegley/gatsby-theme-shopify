import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

const ProductListPage = ({data}) => {
  return data.allShopifyProduct.edges.map(({node}, index) => {
    return (
      <div>
        <div>
          {node.images && node.images.length ? (
            <Link to={node.fields.slug}>
              <Image fluid={node.images[0].localFile.childImageSharp.fluid} />
            </Link>
          ) : null}
        </div>
        <div>
          <Link to={node.fields.slug}>
            <span>{node.title}</span>
          </Link>
        </div>
        <div>
          <div>
            <div>
              <span>$</span>
            </div>
            <div>
              <span>
                {parseInt(node.priceRange.minVariantPrice.amount)
                  .toLocaleString(2)
                  .replace('.00', '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  })
}

export default ProductListPage
