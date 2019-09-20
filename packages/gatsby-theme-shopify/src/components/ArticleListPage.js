/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import Layout from './Layout'
import PaginationNavbar from './PaginationNavbar'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

const ArticlePreview = ({article}) => {
  return (
    <div>
      <Link to={article.fields.slug}>
        <div>{article.image ? <Image fluid={article.image.localFile.childImageSharp.fluid} /> : null}</div>
        <Styled.h2>{article.title}</Styled.h2>
        <div>
          <span>Read more</span>
        </div>
      </Link>
      <div dangerouslySetInnerHTML={{__html: article.excerptHtml}} />
    </div>
  )
}

const ArticleListPage = ({data, pageContext}) => {
  const {edges: articles} = data.allShopifyArticle

  return (
    <Layout>
      <div>
        <Styled.h1>News</Styled.h1>
      </div>
      {articles.map(({node: article}) => {
        return <ArticlePreview key={article.id} article={article} />
      })}
      <PaginationNavbar
        pageNumber={pageContext.pageNumber}
        totalPages={pageContext.numberOfPages}
        baseUrl="articles/"
      />
    </Layout>
  )
}

export default ArticleListPage
