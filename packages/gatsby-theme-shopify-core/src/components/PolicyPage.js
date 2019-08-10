import React from 'react'

const PolicyPage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default PolicyPage
