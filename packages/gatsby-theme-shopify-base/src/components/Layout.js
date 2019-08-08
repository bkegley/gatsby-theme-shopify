/** @jsx jsx */
import {
  jsx,
  Layout as LayoutLayout,
  Container,
  Header as LayoutHeader,
  Footer as LayoutFooter,
  Main,
  Flex,
  Box,
} from 'theme-ui'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <LayoutLayout>
      <LayoutHeader>
        <Container>
          <Header />
        </Container>
      </LayoutHeader>
      <Main>
        <Container>
          <Flex>
            <Box sx={{flex: 1, mr: 5}}>
              <Sidebar />
            </Box>
            <Box sx={{flex: 5}}>{children}</Box>
          </Flex>
        </Container>
      </Main>
      <LayoutFooter>
        <Footer />
      </LayoutFooter>
    </LayoutLayout>
  )
}

export default Layout
