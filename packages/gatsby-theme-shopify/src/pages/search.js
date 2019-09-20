/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import Layout from '../components/Layout'
import {graphql, Link} from 'gatsby'

const SearchPage = ({data}) => {
  const params = window.location.search
  const searchString = decodeURIComponent(
    params
      .replace('?', '')
      .split('&')
      .map(param => param.split('='))
      .find(param => param[0] === 'q')[1],
  )

  const productResults = data.allShopifyProduct.edges.filter(({node}) =>
    node.title.toLowerCase().includes(searchString.toLowerCase()),
  )

  const articleResults = data.allShopifyArticle.edges.filter(({node}) =>
    node.title.toLowerCase().includes(searchString.toLowerCase()),
  )

  return (
    <Layout>
      <Styled.h2>Products</Styled.h2>
      {productResults.map(({node: product}) => {
        return (
          <div key={product.id}>
            <Link to={product.fields.slug}>{product.title}</Link>
          </div>
        )
      })}
      <Styled.h2>Articles</Styled.h2>
      {articleResults.map(({node: article}) => {
        return (
          <div key={article.id}>
            <Link to={article.fields.slug}>{article.title}</Link>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          id
          title
          fields {
            slug
          }
        }
      }
    }
    allShopifyArticle {
      edges {
        node {
          id
          title
          fields {
            slug
          }
        }
      }
    }
  }
`

export default SearchPage
