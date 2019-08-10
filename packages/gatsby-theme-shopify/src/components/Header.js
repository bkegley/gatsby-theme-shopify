/** @jsx jsx */
import {jsx, Flex, Box, Styled} from 'theme-ui'
import {graphql, useStaticQuery, Link} from 'gatsby'
import {useCart} from 'gatsby-theme-shopify-core'

const Header = () => {
  const [cart] = useCart()
  const cartQuantity = cart.reduce((count, item) => count + item.quantity, 0)

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <Box sx={{mx: 'auto', borderBottom: '1px solid lightgrey'}}>
      <Flex sx={{flexDirection: 'row', alignItems: 'center'}}>
        <Box sx={{flex: 1}}>Search</Box>
        <Box sx={{mx: 2}}>
          <Link to="/cart" sx={{textDecoration: 'none', color: 'inherit', ':hover': {color: 'primary'}}}>
            Cart ({cartQuantity})
          </Link>
        </Box>
        <Box>
          <Link to="/account" sx={{textDecoration: 'none', color: 'inherit', ':hover': {color: 'primary'}}}>
            Account
          </Link>
        </Box>
      </Flex>
      <Box>
        <Styled.h1>
          <Link to="/" sx={{textDecoration: 'none', color: 'inherit', ':hover': {color: 'primary'}}}>
            {data.site.siteMetadata.title}
          </Link>
        </Styled.h1>
      </Box>
    </Box>
  )
}

export default Header
