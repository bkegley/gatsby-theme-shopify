import React from 'react'
import fetchShopifyStorefront from '../utils/fetchShopifyStorefront'

export const CartContext = React.createContext()

const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART_LINE_ITEM = 'UPDATE_CART_LINE_ITEM'
const REMOVE_CART_LINE_ITEM = 'REMOVE_CART_LINE_ITEM'
const EMPTY_CART = 'EMPTY_CART'

const createCheckoutMutation = `mutation checkoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    checkout {
      webUrl
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}`

const cartReducer = (cart, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // check if line item already exists
      const existingLineItem = cart.find(item => item.variantId === action.lineItem.variantId)
      return (
        cart
          .map(item => {
            // update quantity if line item already exists
            if (item.variantId === action.lineItem.variantId) {
              return {...item, quantity: existingLineItem.quantity + action.lineItem.quantity}
            }
            return item
          })
          // if line item doesn't exist add it to the end
          .concat(existingLineItem ? null : action.lineItem)
          .filter(Boolean)
      )
    }
    case UPDATE_CART_LINE_ITEM: {
      return cart.map(item => {
        return item.variantId !== action.variantId
          ? item
          : {...item, quantity: action.quantity, customAttributes: action.customAttributes}
      })
    }
    case REMOVE_CART_LINE_ITEM: {
      return cart.filter(item => item.variantId !== action.variantId)
    }
    case EMPTY_CART: {
      return []
    }
    default: {
      throw new Error(`Provide a valid action type`)
    }
  }
}

const initialState =
  typeof window === 'undefined' || !window.localStorage.getItem('cart')
    ? []
    : JSON.parse(window.localStorage.getItem('cart'))

const CartProvider = ({shopName, accessToken, endpoint, children}) => {
  if ((!endpoint && !shopName) || !accessToken) {
    throw new Error(`Either an endpoint or shopName and accessToken are required`)
  }
  const [cart, dispatch] = React.useReducer(cartReducer, initialState)

  React.useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = ({variantId, quantity, customAttributes, product}) => {
    if (!variantId || (!quantity && quantity !== 0)) {
      throw new Error('variantId and quantity are required')
    }
    const lineItem = {
      variantId,
      quantity: typeof quantity === 'number' ? quantity : parseInt(quantity),
      customAttributes,
      product,
    }

    dispatch({
      type: ADD_TO_CART,
      lineItem,
    })
  }

  const updateCartLineItem = ({quantity, variantId, customAttributes}) => {
    dispatch({type: UPDATE_CART_LINE_ITEM, variantId, quantity, customAttributes})
  }

  const removeCartLineItem = variantId => {
    dispatch({type: REMOVE_CART_LINE_ITEM, variantId})
  }

  const emptyCart = () => {
    dispatch({type: EMPTY_CART})
  }

  const createCheckout = ({
    allowPartialAddresses,
    customAttributes,
    email,
    note,
    presentmentCurrencyCode,
    shippingAddress,
  } = {}) => {
    const lineItems = cart.map(lineItem => {
      const {quantity, variantId, customAttributes} = lineItem
      return {
        quantity,
        variantId,
        customAttributes,
      }
    })

    const inputWithNull = {
      allowPartialAddresses,
      customAttributes,
      email,
      lineItems,
      note,
      presentmentCurrencyCode,
      shippingAddress,
    }

    // remove null keys in input
    const input = Object.assign(
      ...Object.keys(inputWithNull)
        .filter(key => inputWithNull[key])
        .map(key => ({[key]: inputWithNull[key]})),
    )

    return new Promise((resolve, reject) => {
      fetchShopifyStorefront({
        shopName,
        accessToken,
        endpoint,
        query: createCheckoutMutation,
        variables: {input},
      })
        .then(res => res.json())
        .then(res => {
          if (
            res.errors ||
            (res.data.checkoutCreate.checkoutUserErrors && res.data.checkoutCreate.checkoutUserErrors.length > 0)
          ) {
            reject(res)
          } else {
            resolve(res)
          }
        })
        .catch(err => reject(err))
    })
  }

  const value = React.useMemo(
    () => ({
      cart,
      addToCart,
      updateCartLineItem,
      removeCartLineItem,
      emptyCart,
      createCheckout,
    }),
    [cart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
