import React from 'react'

const CollectionPage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default CollectionPage
