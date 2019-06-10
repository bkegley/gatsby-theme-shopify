import React from 'react'
import {Layout, Header as LayoutHeader, Main, Footer as LayoutFooter, Container, Styled} from 'theme-ui'
import HeaderWrapper from './HeaderWrapper'
import FooterWrapper from './FooterWrapper'

const MainLayout = ({children}) => {
  return (
    <Styled.root>
      <Layout>
        <LayoutHeader>
          <HeaderWrapper />
        </LayoutHeader>
        <Main>
          <Container>{children}</Container>
        </Main>
        <LayoutFooter>
          <FooterWrapper />
        </LayoutFooter>
      </Layout>
    </Styled.root>
  )
}

export default MainLayout
