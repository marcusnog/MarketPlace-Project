
import { handleLogout } from '@store/actions/auth'

const msUser = process.env.REACT_APP_USER_API
const msPurchase = process.env.REACT_APP_PURCHASEPOINTS_API
// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    dispatch({
      type: 'LOADING_USER'
    })
    await axios.get(`${msPurchase}/api/PointsPurchase/GetList`, { params }).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.data,
        total: response.data.metadata.totalItems,
        params
      })
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        dispatch(handleLogout())
      }
      dispatch({
        type: 'ERROR_USER',
        errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      })
    })
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get(`${msPurchase}/api/PointsPurchase/GetList${id}`)
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedItem: response.data.data
        })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_USER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}