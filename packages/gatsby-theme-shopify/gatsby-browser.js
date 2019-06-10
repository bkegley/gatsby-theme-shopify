import React from 'react'
import {ThemeProvider, Styled} from 'theme-ui'
import './globals.css'

import theme from './src/theme'

export const wrapRootElement = ({element}) => {
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>{element}</Styled.root>
    </ThemeProvider>
  )
}
