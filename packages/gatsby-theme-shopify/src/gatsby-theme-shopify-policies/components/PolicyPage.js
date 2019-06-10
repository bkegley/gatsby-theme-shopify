import React from 'react'
import Layout from '../../components/Layout'
import {Box} from 'theme-ui'

const PolicyPage = props => {
  return (
    <Layout>
      <Box>{JSON.stringify(props, null, 2)}</Box>
    </Layout>
  )
}

export default PolicyPage
