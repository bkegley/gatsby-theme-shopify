import React from 'react'
import {css, Box} from 'theme-ui'
import Layout from './Layout'

const ArticlePage = props => {
  const {
    data: {shopifyArticle: article},
  } = props

  return (
    <Layout>
      <h1 css={css({color: 'primary'})}>{article.title}</h1>
      <Box dangerouslySetInnerHTML={{__html: article.contentHtml}} />
    </Layout>
  )
}

export default ArticlePage
