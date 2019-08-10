/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from '../../components/Layout'
import ArticlePageBase from 'gatsby-theme-shopify-core/src/components/ArticlePage'

const ArticlePage = props => {
  return (
    <Layout>
      <ArticlePageBase {...props} />
    </Layout>
  )
}

export default ArticlePage
