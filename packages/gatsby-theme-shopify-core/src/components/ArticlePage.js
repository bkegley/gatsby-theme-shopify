import React from 'react'

const ArticlePage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default ArticlePage
