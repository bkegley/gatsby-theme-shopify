/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../../components/Layout'
import ArticleListPageBase from 'gatsby-theme-shopify-core/src/components/ArticleListPage'

const ArticleListPage = props => {
  return (
    <Layout>
      <ArticleListPageBase {...props} />
    </Layout>
  )
}

export default ArticleListPage
