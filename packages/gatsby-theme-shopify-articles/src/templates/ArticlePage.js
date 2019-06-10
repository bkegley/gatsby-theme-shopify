import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import ArticlePage from '../components/Article/ArticlePage'

const ArticlePageWrapper = props => {
  return <ArticlePage {...props} />
}

export const query = graphql`
  query getArticleInfo($id: String!) {
    shopifyArticle(id: {eq: $id}) {
      id
      title
      contentHtml
      author {
        firstName
        lastName
      }
    }
  }
`

ArticlePageWrapper.propTypes = {
  data: PropTypes.object,
}

export default ArticlePageWrapper
