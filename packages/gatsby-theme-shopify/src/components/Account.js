/** @jsx jsx */
import {jsx} from 'theme-ui'
import {useStorefront, useCustomer} from 'gatsby-theme-shopify-core'

const customerQuery = `query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      email
      firstName
      lastName
      displayName
      email
      phone
      addresses(first: 10) {
        edges {
          node {
            id
            company
            firstName
            lastName
            name
            phone
            address1
            address2
            city
            province
            provinceCode
            zip
            country
            countryCodeV2
            formatted
            formattedArea
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            name
            customerUrl
            orderNumber
            processedAt
            totalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 250) {
              edges {
                node {
                  customAttributes {
                    key
                    value
                  }
                  discountAllocations {
                    allocatedAmount {
                      amount
                      currencyCode
                    }
                    discountApplication {
                      allocationMethod
                      targetSelection
                      targetType
                      value {
                        __typename
                      }
                    }
                  }
                  quantity
                  title
                  variant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`

const Account = ({accessToken}) => {
  const {loading, error, data} = useStorefront({query: customerQuery, variables: {customerAccessToken: accessToken}})
  const [_, {logout}] = useCustomer()
  if (loading || !data) return null
  if (error) return <div>Error!</div>
  const {customer} = data

  // if access token is invalid force a page refresh to log the user out
  if (!customer) {
    window.location.reload()
    return null
  }
  return (
    <div>
      <h1>Hello, {customer.displayName}</h1>
      <button type="button" onClick={logout} sx={{variant: 'buttons.secondary'}}>
        Logout
      </button>
      <p>{customer.firstName}</p>
      <p>{customer.lastName}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
    </div>
  )
}

export default Account
