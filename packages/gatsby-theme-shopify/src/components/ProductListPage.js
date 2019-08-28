/** @jsx jsx */
import {jsx, Flex} from 'theme-ui'
import Layout from './Layout'
import ProductCard from './ProductCard'
import PaginationNavbar from './PaginationNavbar'

const ProductListPage = ({data, pageContext}) => {
  const products = data.allShopifyProduct.edges.map(({node}) => {
    return <ProductCard key={node.id} product={node} />
  })
  return (
    <Layout>
      <Flex sx={{flexWrap: 'wrap'}}>{products}</Flex>
      <PaginationNavbar
        pageNumber={pageContext.pageNumber}
        totalPages={pageContext.numberOfProductListPages}
        baseUrl="/products"
      />
    </Layout>
  )
}

export default ProductListPage
