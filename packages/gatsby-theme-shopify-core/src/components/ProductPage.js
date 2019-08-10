import React from 'react'

const ProductPage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default ProductPage
