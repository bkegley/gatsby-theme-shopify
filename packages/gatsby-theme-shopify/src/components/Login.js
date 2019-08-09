import React from 'react'
import {useCustomer} from 'gatsby-theme-shopify-core'

const Login = () => {
  const [{}, {login}] = useCustomer()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const submitForm = e => {
    e.preventDefault()
    login({email, password})
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
