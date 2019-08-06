import React from 'react'
import Image from 'gatsby-image'

const ProductPage = ({data}) => {
  const {shopifyProduct: product} = data

  const initialValues = Object.assign(...product.options.map(option => ({[option.name]: option.values[0]})), {
    quantity: 0,
  })
  const [values, setValues] = React.useState(initialValues)

  const handleChange = e => {
    setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
  }

  const variant = product.variants.find(variant => {
    return variant.selectedOptions.every(option => values[option.name] === option.value)
  })

  const submitForm = () => {
    console.log({variant, values})
  }
  const options = product.options
    .filter(option => option.name !== 'Title') // filter out default option
    .map(option => {
      return (
        <div>
          <label htmlFor={option.id}>{option.name}</label>
          <select onChange={handleChange} name={option.name} id={option.id}>
            {option.values.map(value => (
              <option value={value}>{value}</option>
            ))}
          </select>
        </div>
      )
    })
  return (
    <div>
      <h1>{product.title}</h1>
      <div>
        <Image fluid={product.images[0].localFile.childImageSharp.fluid} />
      </div>
      <div>
        <p>{product.description}</p>
      </div>
      <div>{options}</div>
      <div>
        <input type="number" name="quantity" value={values.quantity} onChange={handleChange} />
      </div>
      <div>
        <h3>The price</h3>
        <p>{variant.price}</p>
      </div>
      <div>
        <button onClick={submitForm}>Submit</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default ProductPage
