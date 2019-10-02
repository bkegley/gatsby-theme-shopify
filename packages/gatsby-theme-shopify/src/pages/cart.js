/** @jsx jsx */
import {jsx, Styled, Flex, Box} from 'theme-ui'
import {useCart} from 'gatsby-theme-shopify-core'
import Layout from '../components/Layout'
import Image from 'gatsby-image'

const Cart = () => {
  const {cart, updateCartLineItem, removeCartLineItem, createCheckout} = useCart()

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
            <Styled.p sx={{fontWeight: 'bold', fontSize: 2}}>{variant.title}</Styled.p>
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
        <Styled.h1>Cart</Styled.h1>
        {lineItems}
        <div>
          <button
            sx={{variant: 'buttons.primary', my: 4}}
            onClick={() => {
              createCheckout()
                .then(res => {
                  if (
                    res.data.checkoutCreate.checkoutUserErrors &&
                    res.data.checkoutCreate.checkoutUserErrors.length > 0
                  ) {
                    console.log(res)
                  }
                  window.location.replace(res.data.checkoutCreate.checkout.webUrl)
                })
                .catch(err => console.log({err}))
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
