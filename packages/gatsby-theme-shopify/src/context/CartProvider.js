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
      const existingLineItem = cart.find(item => item.id === action.lineItem.id)
      return (
        cart
          .map(item => {
            // update quantity if line item already exists
            if (item.id === action.lineItem.id) {
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
        return item.id !== action.lineItemId ? item : action.lineItem
      })
    }
    case REMOVE_CART_LINE_ITEM: {
      return cart.filter(item => item.id !== action.lineItemId)
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
  !window || !window.localStorage.getItem('cart') ? [] : JSON.parse(window.localStorage.getItem('cart'))

const CartProvider = ({children}) => {
  const [cart, dispatch] = React.useReducer(cartReducer, initialState)

  React.useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = lineItem => {
    dispatch({type: ADD_TO_CART, lineItem})
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
