/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

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
    <Layout>
      {products.length > 0 ? (
        products
      ) : (
        <div>
          <span>Bummer!</span>
          <span>Your search came up empty. Keep searching.</span>
        </div>
      )}
    </Layout>
  )
}

export default CollectionPage
