/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import {useStorefront, useCustomer, useCart} from 'gatsby-theme-shopify-core'

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
  const {logout} = useCustomer()
  const {emptyCart} = useCart()

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
      <Styled.h1>Hello, {customer.displayName}</Styled.h1>
      <button
        type="button"
        onClick={() => {
          emptyCart()
          logout()
        }}
        sx={{variant: 'buttons.secondary'}}
      >
        Logout
      </button>
      <Styled.p>{customer.firstName}</Styled.p>
      <Styled.p>{customer.lastName}</Styled.p>
      <Styled.p>{customer.email}</Styled.p>
      <Styled.p>{customer.phone}</Styled.p>
    </div>
  )
}

export default Account
