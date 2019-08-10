/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

const ProductListPage = ({data}) => {
  return (
    <Layout>
      {data.allShopifyProduct.edges.map(({node}, index) => {
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
      })}
    </Layout>
  )
}

export default ProductListPage
