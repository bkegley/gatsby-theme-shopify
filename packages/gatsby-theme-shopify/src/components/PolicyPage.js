/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'

const PolicyPage = props => {
  const {
    data: {shopifyShopPolicy},
  } = props
  return (
    <Layout>
      <div>
        <h1>{shopifyShopPolicy.title}</h1>
        <div dangerouslySetInnerHTML={{__html: shopifyShopPolicy.body}} />
      </div>
    </Layout>
  )
}

export default PolicyPage
