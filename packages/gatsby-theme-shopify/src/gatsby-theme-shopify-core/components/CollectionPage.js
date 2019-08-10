/** @jsx jsx */
import {jsx} from 'theme-ui'
import CollectionPageBase from 'gatsby-theme-shopify-core/src/components/CollectionPage'
import Layout from '../../components/Layout'

const CollectionPage = props => {
  return (
    <Layout>
      <CollectionPageBase {...props} />
    </Layout>
  )
}

export default CollectionPage
