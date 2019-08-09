/** @jsx jsx */
import {jsx, Flex, Box} from 'theme-ui'
import {graphql, useStaticQuery, Link} from 'gatsby'

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    {
      allShopifyCollection {
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
    <Flex sx={{flexDirection: 'column'}}>
      {data.allShopifyCollection.edges.map(({node: collection}) => {
        return (
          <Box key={collection.id} sx={{borderBottom: '1px solid lightgrey', py: 2}}>
            <Link
              to={collection.fields.slug}
              sx={{color: 'inherit', textDecoration: 'none', ':hover': {color: 'primary'}}}
            >
              {collection.title}
            </Link>
          </Box>
        )
      })}
    </Flex>
  )
}

export default Sidebar
