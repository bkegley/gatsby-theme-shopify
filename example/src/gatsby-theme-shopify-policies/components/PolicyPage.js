import React from 'react'

const PolicyPage = props => {
  console.log({props})
  return (
    <div>
      <h1>This is a new page!</h1>
      <span>We are overriding it this way which is wayyyy cooler!</span>
      {JSON.stringify(props, null, 2)}
    </div>
  )
}

export default PolicyPage
