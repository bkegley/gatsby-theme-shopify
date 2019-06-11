import React from 'react'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import Layout from './Layout'
import {Flex, Box, css} from 'theme-ui'

const ProductListPage = ({data}) => {
  const productList = data.allShopifyProduct.edges.map(({node}, index) => {
    return node ? (
      <Flex
        flexDirection="column"
        alignItems="center"
        key={node ? node.id : index}
        mx={3}
        flex={['1', '0 1 22%', '0 1 22%', '0 1 22%']}
        mb={[4, 4, 6, 6]}
      >
        <Box width="100%">
          {node.images && node.images.length ? (
            <Link
              css={css({
                color: 'primary',
                textDecoration: 'none',
                ':hover': {
                  color: 'secondary',
                  textDecoration: 'underline',
                },
              })}
              to={node.fields.slug}
            >
              <Image fluid={node.images[0].localFile.childImageSharp.fluid} />
            </Link>
          ) : null}
        </Box>
        <Box style={{textAlign: 'center'}} mb={3} flex={1}>
          <Link
            css={css({
              color: 'primary',
              textDecoration: 'none',
              ':hover': {
                color: 'secondary',
                textDecoration: 'underline',
              },
            })}
            to={node.fields.slug}
          >
            <span css={css({textTransform: 'uppercase'})}>{node.title}</span>
          </Link>
        </Box>
        <Flex flexDirection="column" alignItems="center" pb={2} width="100%">
          <Flex flexDirection="row">
            <Box mr={1}>
              <span css={css({fontSize: '10px'})}>$</span>
            </Box>
            <Box>
              <span>
                {parseInt(node.priceRange.minVariantPrice.amount)
                  .toLocaleString(2)
                  .replace('.00', '')}
              </span>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    ) : (
      <Box flex={1} m={3} />
    )
  })
  return (
    <Layout>
      <Flex flexWrap="wrap">{productList}</Flex>
    </Layout>
  )
}

export default ProductListPage
