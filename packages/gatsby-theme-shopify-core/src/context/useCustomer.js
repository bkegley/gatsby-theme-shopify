import React from 'react'
import {CustomerContext} from './CustomerProvider'

const useCustomer = () => {
  const context = React.useContext(CustomerContext)

  if (!context) {
    throw new Error(`useCustomer can only be used inside a CustomerProvider component`)
  }
  const [customer, {initializeCustomer, ...remainingFunctions}] = context

  React.useEffect(() => {
    initializeCustomer()
  }, [])

  return [customer, remainingFunctions]
}

export default useCustomer
