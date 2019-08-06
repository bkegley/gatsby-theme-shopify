/** @jsx jsx */
import {jsx, Flex, Box, Styled} from 'theme-ui'
import React from 'react'
import Image from 'gatsby-image'
import {useCart} from 'gatsby-theme-shopify'

const ProductPage = ({data}) => {
  const {cart, addToCart} = useCart()
  console.log({cart})

  const {shopifyProduct: product} = data
  const initialValues = Object.assign(...product.options.map(option => ({[option.name]: option.values[0]})), {
    quantity: 0,
  })
  const [values, setValues] = React.useState(initialValues)
  const handleChange = e => {
    setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
  }

  const [activeImageIndex, setActiveImageIndex] = React.useState(0)
  const images = product.images
    .map((image, index) => {
      return (
        <Box sx={{flex: 1}} key={`image-${index}`}>
          <Image
            sx={{opacity: activeImageIndex === index ? 0.5 : 1.0}}
            fluid={image.localFile.childImageSharp.fluid}
            onClick={() => setActiveImageIndex(index)}
          />
        </Box>
      )
    })
    // add empty boxes to make full rows
    .concat(
      Array.from(new Array(3 - (product.images.length % 3))).map((_, index) => (
        <Box sx={{flex: 1}} key={`empty-${index}`} />
      )),
    )

  const variant = product.variants.find(variant => {
    return variant.selectedOptions.every(option => values[option.name] === option.value)
  })

  const submitForm = () => {
    addToCart({...variant, quantity: values.quantity})
  }

  const options = product.options
    .filter(option => option.name !== 'Title') // filter out default option
    .map(option => {
      return (
        <Box sx={{mb: 2, mr: 3}} key={option.id}>
          <div sx={{mb: 1}}>
            <label sx={{fontSize: 0}} htmlFor={option.id}>
              {option.name}
            </label>
          </div>
          <select onChange={handleChange} name={option.name} id={option.id}>
            {option.values.map(value => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </Box>
      )
    })
  return (
    <div>
      <Flex sx={{flexDirection: ['column', 'column', 'row', 'row']}}>
        <Box sx={{flex: 1, mb: 4}}>
          <Box>
            <Image fluid={product.images[activeImageIndex].localFile.childImageSharp.fluid} />
          </Box>
          <Flex sx={{flexDirection: 'row'}}>{images}</Flex>
        </Box>
        <Box sx={{flex: 1, mb: 4}}>
          <Styled.h1>{product.title}</Styled.h1>
          <div>
            <p sx={{fontSize: 3}}>
              {parseInt(variant.price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
            </p>
            <Flex>{options}</Flex>
            <Box sx={{mb: 2, mr: 3}}>
              <div sx={{mb: 1}}>
                <label sx={{fontSize: 0}} htmlFor="quantity">
                  Quantity
                </label>
              </div>
              <input type="number" id="quantity" name="quantity" value={values.quantity} onChange={handleChange} />
            </Box>
          </div>
          <div>
            <button sx={{variant: 'buttons.primary'}} onClick={submitForm}>
              Submit
            </button>
          </div>
        </Box>
      </Flex>
      <Box>
        <p>{product.description}</p>
      </Box>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default ProductPage
