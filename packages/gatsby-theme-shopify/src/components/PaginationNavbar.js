import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

const buildPaginationArray = (currentPage, totalPages, maxItems = 5) => {
  const paginationArray = [currentPage]

  const addToArray = (currentArray, count = 1) =>
    (function() {
      const previousPage = currentPage - count
      const nextPage = currentPage + count
      if (nextPage <= totalPages) {
        currentArray.push(nextPage)
        if (currentArray.length > maxItems) return currentArray
        if (previousPage > 0) {
          currentArray.push(previousPage)
          if (currentArray.length > maxItems) return currentArray
        }
        return addToArray(currentArray, count + 1)
      }
      if (previousPage > 0) {
        currentArray.push(previousPage)
        if (currentArray.length > maxItems) return currentArray
        return addToArray(currentArray, count + 1)
      }
      return currentArray
    })()
  return addToArray(paginationArray).sort((a, b) => a - b)
}

const PaginationNavbar = ({pageNumber, totalPages, baseUrl}) => {
  const paginationArray = buildPaginationArray(pageNumber, totalPages, 7)

  console.log({baseUrl})

  const paginationLinks = paginationArray.map(link => {
    return (
      <Link key={link} to={`/${baseUrl[baseUrl.length - 1] === '/' ? baseUrl : `${baseUrl}/`}${link.toString()}`}>
        {link}
      </Link>
    )
  })

  return <div>{paginationLinks}</div>
}

PaginationNavbar.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
}

export default PaginationNavbar
