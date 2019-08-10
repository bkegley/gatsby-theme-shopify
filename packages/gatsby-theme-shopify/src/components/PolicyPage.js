/** @jsx jsx */
import {jsx} from 'theme-ui'
import Layout from './Layout'

const PolicyPage = props => {
  return (
    <Layout>
      <div>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </Layout>
  )
}

export default PolicyPage
