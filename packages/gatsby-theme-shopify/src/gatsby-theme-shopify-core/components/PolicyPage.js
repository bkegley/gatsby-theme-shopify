/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../../components/Layout'
import PolicyPageBase from 'gatsby-theme-shopify-core/src/components/PolicyPage'

const PolicyPage = props => {
  return (
    <Layout>
      <PolicyPageBase {...props} />
    </Layout>
  )
}

export default PolicyPage
