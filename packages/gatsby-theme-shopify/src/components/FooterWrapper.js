import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import Footer from './Footer'

const FooterWrapper = () => {
  const data = useStaticQuery(graphql`
    {
      ...NavigationWrapperFragment
    }
  `)

  return <Footer data={data} />
}

export default FooterWrapper
