import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import Header from './Header'

const HeaderWrapper = () => {
  const data = useStaticQuery(graphql`
    {
      ...NavigationWrapperFragment
    }
  `)

  return <Header data={data} />
}

export default HeaderWrapper
