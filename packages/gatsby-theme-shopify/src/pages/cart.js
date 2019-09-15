/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import {useCart} from 'gatsby-theme-shopify-core'
import Layout from '../components/Layout'
import Image from 'gatsby-image'

const Cart = () => {
  const [cart, {updateCartLineItem, removeCartLineItem}] = useCart()

  const lineItems = cart.map(item => {
    const variant = item.product.variants.find(variant => variant.shopifyId === item.variantId)
    console.log({variant})
    return (
      <Flex key={item.variantId} sx={{flexDirection: ['column', 'column', 'row', 'row'], alignItems: 'center'}}>
        <Box sx={{flex: 1, display: ['none', 'none', 'block', 'block']}}>
          {variant.image ? <Image fluid={variant.image.localFile.childImageSharp.fluid} /> : null}
        </Box>
        <Box sx={{flex: 2}}>
          <label htmlFor={item.variantId}>
            <p sx={{fontWeight: 'bold', fontSize: 2}}>{variant.title}</p>
          </label>
          <Flex flexDirection="row" alignItems="center">
            <Box>
              <input
                name={item.variantId}
                value={item.quantity}
                type="number"
                onChange={e =>
                  updateCartLineItem({
                    variantId: item.variantId,
                    quantity: parseInt(e.currentTarget.value),
                  })
                }
              />
            </Box>
            <Box>
              <button
                sx={{variant: 'buttons.secondary'}}
                type="button"
                onClick={() => removeCartLineItem(item.variantId)}
              >
                remove
              </button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    )
  })

  return (
    <Layout>
      <div>
        <h1>Cart</h1>
        {lineItems}
      </div>
    </Layout>
  )
}

export default Cart
