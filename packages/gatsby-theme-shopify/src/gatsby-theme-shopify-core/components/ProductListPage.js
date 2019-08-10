/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../../components/Layout'
import ProductListPageBase from 'gatsby-theme-shopify-core/src/components/ProductListPage'

const ProductListPage = props => {
  return (
    <Layout>
      <ProductListPageBase {...props} />
    </Layout>
  )
}

export default ProductListPage
