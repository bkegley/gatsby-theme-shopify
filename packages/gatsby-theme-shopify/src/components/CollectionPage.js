/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import Layout from './Layout'
import ProductCard from './ProductCard'

const CollectionPage = props => {
  const {
    data: {shopifyCollection: collection},
  } = props

  const products = collection.products.map((product, index) => {
    return <ProductCard key={product.id} product={product} />
  })

  return (
    <Layout>
      {products.length > 0 ? (
        <Flex sx={{flexWrap: 'wrap'}}>{products}</Flex>
      ) : (
        <div>
          <span>Bummer!</span>
          <span>Your search came up empty. Keep searching.</span>
        </div>
      )}
    </Layout>
  )
}

export default CollectionPage
