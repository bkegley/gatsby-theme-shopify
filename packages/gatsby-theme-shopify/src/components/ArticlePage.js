import React from 'react'

const ArticlePage = props => {
  const {
    data: {shopifyArticle: article},
  } = props

  return (
    <div>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{__html: article.contentHtml}} />
    </div>
  )
}

export default ArticlePage
