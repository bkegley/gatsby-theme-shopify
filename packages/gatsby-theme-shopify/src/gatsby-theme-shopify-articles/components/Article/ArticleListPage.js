import React from 'react'
import ArticlePreview from './ArticlePreview'
import PaginationNavbar from '../../../components/PaginationNavbar'
import Layout from '../../../components/Layout'
import {Flex, Box} from 'theme-ui'

const ArticleListPage = ({data, pageContext}) => {
  const {edges: articles} = data.allShopifyArticle
  return (
    <Layout>
      <Flex flexDirection="column" alignItems="center">
        <Box>
          <h1>News</h1>
        </Box>
        {articles.map(({node: article}) => {
          return <ArticlePreview key={article.id} article={article} />
        })}
        <PaginationNavbar
          pageNumber={pageContext.pageNumber}
          totalPages={pageContext.numberOfPages}
          baseUrl="articles/"
        />
      </Flex>
    </Layout>
  )
}

export default ArticleListPage
