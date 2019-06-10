import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import {Flex, Box, Styled, css} from 'theme-ui'

const ArticlePreview = ({article}) => {
  return (
    <Flex flexDirection="column" alignItems="flex-start" mb={6} width={1}>
      <Flex flexDirection="column" flex={2} />
      <Box flex={6}>
        <Link
          css={css({
            color: 'primary',
            textDecoration: 'none',
            ':hover': {
              color: 'secondary',
              textDecoration: 'underline',
            },
          })}
          to={article.fields.slug}
        >
          <Box>{article.image ? <Image fluid={article.image.localFile.childImageSharp.fluid} /> : null}</Box>
          <Styled.h2>{article.title}</Styled.h2>
          <Flex alignItems="center">
            <span css={css({color: 'primary'})}>Read more</span>
          </Flex>
        </Link>
        <Box dangerouslySetInnerHTML={{__html: article.excerptHtml}} />
      </Box>
    </Flex>
  )
}

export default ArticlePreview
