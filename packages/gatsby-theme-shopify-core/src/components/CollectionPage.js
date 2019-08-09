import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

const CollectionPage = props => {
  const {
    data: {shopifyCollection: collection},
  } = props

  const products = collection.products.map((product, index) => {
    return (
      <div>
        <div>
          {product.images && product.images.length ? (
            <Link to={product.fields.slug}>
              <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
            </Link>
          ) : null}
        </div>
        <div>
          <Link to={product.fields.slug}>
            <span>{product.title}</span>
          </Link>
        </div>
        <div>
          <div>
            <div>
              <span>$</span>
            </div>
            <div>
              <span>
                {parseInt(product.priceRange.minVariantPrice.amount)
                  .toLocaleString(2)
                  .replace('.00', '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  })
  return (
    <div>
      {products.length > 0 ? (
        products
      ) : (
        <div>
          <span>Bummer!</span>
          <span>Your search came up empty. Keep searching.</span>
        </div>
      )}
    </div>
  )
}

export default CollectionPage
