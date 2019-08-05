import React from 'react'
import Image from 'gatsby-image'

const ProductPage = ({data}) => {
  const product = data.shopifyProduct
  return (
    <>
      <div>
        <h1>{product.title}</h1>
      </div>
      <div>
        <div>
          {product.images.length ? (
            <div>
              <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
            </div>
          ) : null}
        </div>
        <div>
          <div>
            <span>The product form would go here</span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>About</div>
          <span>{product.description}</span>
        </div>
      </div>
    </>
  )
}

export default ProductPage
