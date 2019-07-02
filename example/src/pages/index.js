import React from 'react'
import {useCart, useCustomer} from 'gatsby-theme-shopify'

const IndexPage = () => {
  const cart = useCart()
  const {customer, login, logout} = useCustomer()

  const [values, setValues] = React.useState({})
  const handleChange = e => {
    setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
  }
  return (
    <div>
      <h2>This is the home page</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          login(values)
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default IndexPage
