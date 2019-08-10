import React from 'react'

const ArticleListPage = props => {
  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  )
}

export default ArticleListPage
