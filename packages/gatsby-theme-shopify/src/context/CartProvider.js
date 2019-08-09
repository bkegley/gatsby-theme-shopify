import React from 'react'

export const CartContext = React.createContext()

const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART_LINE_ITEM = 'UPDATE_CART_LINE_ITEM'
const REMOVE_CART_LINE_ITEM = 'REMOVE_CART_LINE_ITEM'
const EMPTY_CART = 'EMPTY_CART'

const cartReducer = (cart, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // check if line item already exists
      const existingLineItem = cart.find(item => item.shopifyId === action.lineItem.shopifyId)
      return (
        cart
          .map(item => {
            // update quantity if line item already exists
            if (item.shopifyId === action.lineItem.shopifyId) {
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
        return item.shopifyId !== action.lineItemId ? item : action.lineItem
      })
    }
    case REMOVE_CART_LINE_ITEM: {
      return cart.filter(item => item.shopifyId !== action.lineItemId)
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

const CartProvider = ({children}) => {
  const [cart, dispatch] = React.useReducer(cartReducer, initialState)

  React.useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = ({shopifyId, quantity, ...remaining}) => {
    if (!shopifyId || (!quantity && quantity !== 0)) {
      throw new Error('shopifyId and quantity are required')
    }
    const lineItem = {
      shopifyId,
      quantity: typeof quantity === 'number' ? quantity : parseInt(quantity),
      ...remaining,
    }

    dispatch({
      type: ADD_TO_CART,
      lineItem,
    })
  }

  const updateCartLineItem = ({lineItem, lineItemId}) => {
    dispatch({type: UPDATE_CART_LINE_ITEM, lineItemId, lineItem})
  }

  const removeCartLineItem = lineItemId => {
    dispatch({type: REMOVE_CART_LINE_ITEM, lineItemId})
  }

  const emptyCart = () => {
    dispatch({type: EMPTY_CART})
  }

  const value = React.useMemo(() => ({cart, addToCart, updateCartLineItem, removeCartLineItem, emptyCart}), [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
