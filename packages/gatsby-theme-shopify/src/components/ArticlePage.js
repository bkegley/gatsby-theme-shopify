/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'

const ArticlePage = props => {
  const {
    data: {shopifyArticle: article},
  } = props
  return (
    <Layout>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{__html: article.contentHtml}} />
    </Layout>
  )
}

export default ArticlePage
