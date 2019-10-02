/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from 'react'
import {useCustomer} from 'gatsby-theme-shopify-core'
import {navigate} from 'gatsby'

const Login = () => {
  const {data, login} = useCustomer()
  if (data && data.accessToken) {
    navigate('/account')
  }
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const submitForm = e => {
    e.preventDefault()
    login({email, password})
  }
  return (
    <div>
      <form onSubmit={submitForm}>
        <div sx={{my: 2}}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} />
        </div>
        <div sx={{my: 2}}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.currentTarget.value)}
          />
        </div>
        <button type="submit" sx={{variant: 'buttons.primary'}}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
