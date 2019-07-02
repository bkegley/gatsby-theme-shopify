import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

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

export default ArticlePreview
