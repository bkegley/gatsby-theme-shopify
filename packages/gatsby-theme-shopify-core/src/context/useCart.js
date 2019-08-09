import React from 'react'
import {CartContext} from './CartProvider'

const useCart = () => {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error(`useCart can only be used inside a CartProvider component`)
  }
  return context
}

export default useCart
