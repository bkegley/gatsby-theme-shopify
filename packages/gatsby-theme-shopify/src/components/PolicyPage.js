/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import Layout from './Layout'

const PolicyPage = props => {
  const {
    data: {shopifyShopPolicy},
  } = props
  return (
    <Layout>
      <div>
        <Styled.h1>{shopifyShopPolicy.title}</Styled.h1>
        <div dangerouslySetInnerHTML={{__html: shopifyShopPolicy.body}} />
      </div>
    </Layout>
  )
}

export default PolicyPage
