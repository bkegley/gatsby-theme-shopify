import React from 'react'
import {ThemeProvider, Styled} from 'theme-ui'
import CartProvider from './src/context/CartProvider'
import './globals.css'

import theme from './src/theme'

export const wrapRootElement = ({element}) => {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Styled.root>{element}</Styled.root>
      </CartProvider>
    </ThemeProvider>
  )
}
