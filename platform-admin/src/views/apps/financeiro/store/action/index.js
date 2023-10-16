import axios from 'axios'
import { handleLogout } from '@store/actions/auth'

const msUser = process.env.REACT_APP_USER_API
const msAddPoints = process.env.REACT_APP_PURCHASEPOINTS_API

// ** Get data on page or row change
export const getData = params => {
    return async dispatch => {
        dispatch({
            type: 'LOADING_USER'
        })
        await axios.get(`${msUser}/api/UserAdministrator`, { params }).then(response => {
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
            .get(`${msUser}/api/UserAdministrator/${id}`)
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

// ** Add new User
export const addUser = item => {
    return (dispatch, getState) => {
        axios
            .post(`${msUser}/api/UserAdministrator`, item)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    item
                })
            })
            .then(() => {
                dispatch(getData(getState().user.params))
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

export const addPoints = item => {

  // const paramPoints = {
  //   userId: "6419ec114005288c709f3b21",
  //   pointsId: "641376d70633b01bc12a1353",
  //   accountId: "6419c928b952dcad5602387e",
  //   pointsValue: 1000
  // }

  return (dispatch, getState) => {
      axios
          .post(`${msAddPoints}/Create`, paramPoints)
          .then(response => {
              dispatch({
                  type: 'ADD_POINTS',
                  item
              })
          })
          .then(() => {
              dispatch(getData(getState().params))
          })
          .catch(err => {
              console.log(err)
              if (err.response.status === 401) {
                  dispatch(handleLogout())
              }
              dispatch({
                  type: 'ERROR_POINTS',
                  errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
              })
          })
  }
}

// ** Update a User
export const updateUser = item => {
    return (dispatch, getState) => {
        axios
            .put(`${msUser}/api/UserAdministrator`, item)
            .then(response => {
                dispatch({
                    type: 'UPDATE_USER',
                    item
                })
            })
            .then(() => {
                dispatch(getData(getState().user.params))
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

// ** Delete User
export const deleteUser = id => {
    return (dispatch, getState) => {
        axios
            .delete(`${msUser}/api/UserAdministrator/${id}`)
            .then(response => {
                dispatch({
                    type: 'DELETE_USER'
                })
            })
            .then(() => {
                dispatch(getData(getState().user.params))
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

// ** Edit current item
export const editUser = id => {
    return async dispatch => {
        dispatch({
            type: 'EDIT_USER',
            currentId: id
        })
    }
}

export const getSystems = () => {
    return async dispatch => {
        dispatch({
            type: 'LOADING_USER_SIDEBAR'
        })
        await axios.get(`${msUser}/api/System/options`).then(response => {
                dispatch({
                    type: 'GET_COMBO_SYSTEM',
                    data: response.data.data
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
export const getProfiles = (systemId) => {
    return async dispatch => {
        dispatch({
            type: 'LOADING_USER_SIDEBAR'
        })
        await axios.get(`${msUser}/api/Profile/options/${systemId}`).then(response => {
                dispatch({
                    type: 'GET_COMBO_PROFILE',
                    data: response.data.data
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