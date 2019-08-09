import React from 'react'
import Layout from '../components/Layout'
import {Router} from '@reach/router'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import Account from '../components/Account'
import Login from '../components/Login'

const AccountPage = () => {
  return (
    <Layout>
      <Router>
        <AuthenticatedRoute path="/account" component={Account} />
        <Login path="/account/login" />
      </Router>
    </Layout>
  )
}

export default AccountPage
