/** @jsx jsx */
import {jsx, Flex, Box, Styled} from 'theme-ui'
import {graphql, useStaticQuery, Link} from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allShopifyShopPolicy {
        edges {
          node {
            id
            title
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Box sx={{py: 4}}>
      <Flex sx={{flexDirection: ['column', 'column', 'row', 'row']}}>
        <Box>
          <Styled.h3>Links</Styled.h3>
          <Flex sx={{flexDirection: 'column'}}>
            {data.allShopifyShopPolicy.edges.map(({node: policy}) => {
              return (
                <Box key={policy.id} sx={{mb: 3}}>
                  <Link
                    to={policy.fields.slug}
                    sx={{textDecoration: 'none', color: 'inherit', ':hover': {color: 'primary'}}}
                  >
                    {policy.title}
                  </Link>
                </Box>
              )
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default Footer
