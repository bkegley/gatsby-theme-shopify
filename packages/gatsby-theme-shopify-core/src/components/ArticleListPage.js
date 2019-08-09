import React from 'react'
import ArticlePreview from './ArticlePreview'
import PaginationNavbar from './PaginationNavbar'

const ArticleListPage = ({data, pageContext}) => {
  const {edges: articles} = data.allShopifyArticle
  return (
    <div>
      <div>
        <div>
          <h1>News</h1>
        </div>
        {articles.map(({node: article}) => {
          return <ArticlePreview key={article.id} article={article} />
        })}
        <PaginationNavbar
          pageNumber={pageContext.pageNumber}
          totalPages={pageContext.numberOfPages}
          baseUrl="articles/"
        />
      </div>
    </div>
  )
}

export default ArticleListPage
