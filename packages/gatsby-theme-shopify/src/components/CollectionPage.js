/** @jsx jsx */
import {jsx, Styled, Flex} from 'theme-ui'
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
          <Styled.p>Bummer!</Styled.p>
          <Styled.p>Your search came up empty. Keep searching.</Styled.p>
        </div>
      )}
    </Layout>
  )
}

export default CollectionPage
