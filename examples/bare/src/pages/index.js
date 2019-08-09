import React from 'react'
import {useCart, useCustomer} from 'gatsby-theme-shopify-core'
import {Link} from 'gatsby'
import Customer from '../components/Customer'

const IndexPage = () => {
  const cart = useCart()
  const [{error, loading, data}, {login, logout, updatePassword}] = useCustomer()

  const [values, setValues] = React.useState({})
  const [password, setPassword] = React.useState('')
  const handleChange = e => {
    setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
  }

  return (
    <div>
      <h2>This is the home page</h2>
      {loading ? (
        <div>Loading!</div>
      ) : data ? (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              updatePassword(password)
            }}
          >
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={e => setPassword(e.currentTarget.value)}
                value={password}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <Customer accessToken={data.accessToken} />
        </div>
      ) : (
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
      )}
      <div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
      <pre>{JSON.stringify({error, loading, data}, null, 2)}</pre>
      <div>
        <Link to="/page-2">Go to page two</Link>
      </div>
    </div>
  )
}

export default IndexPage
