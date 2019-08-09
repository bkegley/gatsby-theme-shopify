import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import ArticleListPage from '../components/ArticleListPage'

const ArticleListPageWrapper = props => {
  return <ArticleListPage {...props} />
}

export const query = graphql`
  query allShopifyArticleQuery($limit: Int, $skip: Int) {
    allShopifyArticle(limit: $limit, skip: $skip) {
      edges {
        node {
          id
          title
          excerptHtml
          author {
            firstName
            lastName
          }
          fields {
            slug
          }
          image {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

ArticleListPageWrapper.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default ArticleListPageWrapper
