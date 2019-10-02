import React from 'react'
import {StorefrontContext} from './StorefrontProvider'
import fetchShopifyStorefront from '../utils/fetchShopifyStorefront'

const FETCH_INIT = 'FETCH_INIT'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'

function reducer(state, action) {
  switch (action.type) {
    case FETCH_INIT: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }

    case FETCH_SUCCESS: {
      return {
        loading: false,
        data: action.data,
        error: null,
      }
    }
    case FETCH_ERROR: {
      return {
        loading: false,
        data: null,
        error: action.error,
      }
    }
    default: {
      throw new Error('Please provide a valid action type')
    }
  }
}

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const useStorefront = ({query, variables, api = '2019-07'}) => {
  const context = React.useContext(StorefrontContext)
  if (!context) {
    throw new Error('useStorefront must be wrapped in a StorefrontProvider')
  }
  const {shopName, accessToken, endpoint} = context

  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    dispatch({type: FETCH_INIT})
    fetchShopifyStorefront({shopName, accessToken, endpoint, query, variables})
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          dispatch({type: FETCH_ERROR, error: res.errors})
          return
        }
        dispatch({type: FETCH_SUCCESS, data: res.data})
      })
      .catch(err => {
        dispatch({type: FETCH_ERROR, error: err})
      })
  }, [query, api, shopName, accessToken, endpoint])

  return state
}

export default useStorefront
