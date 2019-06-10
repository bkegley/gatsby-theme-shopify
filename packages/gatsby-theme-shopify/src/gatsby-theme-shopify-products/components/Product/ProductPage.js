import React from 'react'
import Image from 'gatsby-image'
import Layout from '../../../components/Layout'
import {Flex, Box, css} from 'theme-ui'

const ProductPage = ({data}) => {
  const product = data.shopifyProduct
  return (
    <Layout>
      <Flex flexDirection="column" justifyContent="center">
        <Box mb={4}>
          <h1 css={css({fontSize: [6, 6, 7, 7], lineHeight: [1.5, 1.5, 2, 2]})}>{product.title}</h1>
        </Box>
        <Flex flexDirection="row" alignItems="flex-start" flexWrap="wrap">
          <Box flex={1} style={{minWidth: '300px'}}>
            {product.images.length ? (
              <Box>
                <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
              </Box>
            ) : null}
          </Box>
          <Flex
            flexDirection="column"
            alignItems={['center', 'center', 'flex-start', 'flex-start']}
            p={4}
            flex={1}
            style={{minWidth: '300px'}}
            css={css({display: ['none', 'none', 'inherit', 'inherit']})}
          >
            <Box>
              <span>The product form would go here</span>
            </Box>
          </Flex>
        </Flex>
        <Flex flexDirection="row" mt={[4, 4, 5, 5]} flexWrap="wrap">
          <Box style={{minWidth: '200px'}} flex={1} px={[4, 4, 3, 3]}>
            <div css={css({fontSize: 4, fontWeight: 'bolder', mb: 3, textTransform: 'uppercase'})}>About</div>
            <span>{product.description}</span>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default ProductPage
