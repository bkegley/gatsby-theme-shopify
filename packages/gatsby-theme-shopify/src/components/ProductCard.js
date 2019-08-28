/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import {Link} from 'gatsby'
import Image from 'gatsby-image'

const ProductCard = ({product}) => {
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        flex: ['1', '0 1 22%', '0 1 22%', '0 1 22%'],
        mx: 3,
        mb: [4, 4, 6, 6],
      }}
    >
      <Box sx={{width: '100%', mb: 3}}>
        {product.images && product.images.length ? (
          <Link to={product.fields.slug}>
            <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
          </Link>
        ) : null}
      </Box>
      <Box sx={{mt: 'auto'}}>
        <Box>
          <Link to={product.fields.slug}>
            <span>{product.title}</span>
          </Link>
        </Box>
        <div>
          <span>
            {parseInt(product.priceRange.minVariantPrice.amount).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
      </Box>
    </Flex>
  )
}

export default ProductCard
