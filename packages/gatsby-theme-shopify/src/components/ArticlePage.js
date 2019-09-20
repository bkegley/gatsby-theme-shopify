/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import Layout from './Layout'

const ArticlePage = props => {
  const {
    data: {shopifyArticle: article},
  } = props
  return (
    <Layout>
      <Styled.h1>{article.title}</Styled.h1>
      <div dangerouslySetInnerHTML={{__html: article.contentHtml}} />
    </Layout>
  )
}

export default ArticlePage
