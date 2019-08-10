/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'
import PaginationNavbar from './PaginationNavbar'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

const ArticlePreview = ({article}) => {
  return (
    <div>
      <div>
        <Link to={article.fields.slug}>
          <div>{article.image ? <Image fluid={article.image.localFile.childImageSharp.fluid} /> : null}</div>
          <h2>{article.title}</h2>
          <div>
            <span>Read more</span>
          </div>
        </Link>
        <div dangerouslySetInnerHTML={{__html: article.excerptHtml}} />
      </div>
    </div>
  )
}

const ArticleListPage = ({data, pageContext}) => {
  const {edges: articles} = data.allShopifyArticle

  return (
    <Layout>
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
    </Layout>
  )
}

export default ArticleListPage
