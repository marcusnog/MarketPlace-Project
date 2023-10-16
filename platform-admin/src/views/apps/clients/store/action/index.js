import axios from 'axios'
import { handleLogout } from '@store/actions/auth'

const msClient = process.env.REACT_APP_PARTNER_API

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    dispatch({
      type: 'LOADING_CLIENT'
    })
    await axios.get(`${msClient}/api/Client`, { params }).then(response => {
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
        type: 'ERROR_CLIENT',
        errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      })
    })
  }
}

// ** Get User
export const getClient = id => {
  return async dispatch => {
    await axios
      .get(`${msClient}/api/Client/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_CLIENT',
          selectedItem: response.data.data
        })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CLIENT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Add new User
export const addClient = item => {
  return (dispatch, getState) => {
    axios
      .post(`${msClient}/api/Client`, item)
      .then(response => {
        dispatch({
          type: 'ADD_CLIENT',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().client.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CLIENT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Update a User
export const updateClient = item => {
  return (dispatch, getState) => {
    axios
      .put(`${msClient}/api/Client`, item)
      .then(response => {
        dispatch({
          type: 'UPDATE_CLIENT',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().client.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CLIENT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Delete User
export const deleteClient = id => {
  return (dispatch, getState) => {
    axios
      .delete(`${msClient}/api/Client/${id}`)
      .then(response => {
        dispatch({
          type: 'DELETE_CLIENT'
        })
      })
      .then(() => {
        dispatch(getData(getState().client.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CLIENT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Edit current item
export const editClient = id => {
  return async dispatch => {
    dispatch({
      type: 'EDIT_CLIENT',
      currentId: id
    })
  }
}

//export const getSystems = () => {
  //return async dispatch => {
    //dispatch({
      //type: 'LOADING_USER_SIDEBAR'
    //})
    //await axios.get(`${msClient}/api/System/options`).then(response => {
      //dispatch({
        //type: 'GET_COMBO_SYSTEM',
       // data: response.data.data
      //})
    //})
    //.catch(err => {
      //console.log(err)
      //if (err.response.status === 401) {
        //dispatch(handleLogout())
      //}
      //dispatch({
        //type: 'ERROR_USER',
        //errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      //})
    //})
 // }
//}

//export const getProfiles = (systemId) => {
  //return async dispatch => {
    //dispatch({
     // type: 'LOADING_USER_SIDEBAR'
    //})
    //await axios.get(`${msClient}/api/Profile/options/${systemId}`).then(response => {
      //dispatch({
        //type: 'GET_COMBO_PROFILE',
       // data: response.data.data
      //})
    //})
    //.catch(err => {
      //console.log(err)
      //if (err.response.status === 401) {
        //dispatch(handleLogout())
      //}
      //dispatch({
        //type: 'ERROR_USER',
        //errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      //})
    //})
  //}
//}