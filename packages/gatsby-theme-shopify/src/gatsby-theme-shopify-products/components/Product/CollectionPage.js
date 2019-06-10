import React from 'react'
import Layout from '../../../components/Layout'
import {Link} from 'gatsby'
import Image from 'gatsby-image'
import {Flex, Box, css} from 'theme-ui'

const CollectionPage = props => {
  const {
    data: {shopifyCollection: collection},
  } = props

  const products = collection.products.map((product, index) => {
    return product ? (
      <Flex
        flexDirection="column"
        alignItems="center"
        key={product ? product.id : index}
        mx={3}
        flex={['1', '0 1 22%', '0 1 22%', '0 1 22%']}
        mb={[4, 4, 6, 6]}
      >
        <Box width="100%">
          {product.images && product.images.length ? (
            <Link
              css={css({
                color: 'primary',
                textDecoration: 'none',
                ':hover': {
                  color: 'secondary',
                  textDecoration: 'underline',
                },
              })}
              to={product.fields.slug}
            >
              <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
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
            to={product.fields.slug}
          >
            <span css={{textTransform: 'uppercase'}}>{product.title}</span>
          </Link>
        </Box>
        <Flex flexDirection="column" alignItems="center" pb={2} width="100%">
          <Flex flexDirection="row">
            <Box mr={1}>
              <span css={css({fontSize: '10px', color: 'text'})}>$</span>
            </Box>
            <Box>
              <span css={css({color: 'text'})}>
                {parseInt(product.priceRange.minVariantPrice.amount)
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
      <Flex flex={6} flexWrap="wrap">
        {products.length > 0 ? (
          products
        ) : (
          <Flex flexDirection="column" alignItems="center" flex={1}>
            <span css={css({fontSize: 4, mb: 4})}>Bummer!</span>
            <span>Your search came up empty. Keep searching.</span>
          </Flex>
        )}
      </Flex>
    </Layout>
  )
}

export default CollectionPage
