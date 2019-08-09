import React from 'react'
import {Link} from 'gatsby'
import {useCustomer} from 'gatsby-theme-shopify-core'

const PageTwo = () => {
  const {customer} = useCustomer()
  return (
    <div>
      <h1>Page Two!</h1>
      <div>This is page two</div>
      <pre>{JSON.stringify(customer, null, 2)}</pre>
      <div>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default PageTwo
