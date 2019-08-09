import React from 'react'
import {useCustomer} from 'gatsby-theme-shopify-core'
import {navigate} from 'gatsby'

const AuthenticatedRoute = ({component: Component, ...props}) => {
  const [{loading, error, data}] = useCustomer()
  if (loading) return null
  if (error) return <div>Error!</div>
  if (!data.accessToken) navigate('/account/login')
  return <Component accessToken={data.accessToken} {...props} />
}
export default AuthenticatedRoute
