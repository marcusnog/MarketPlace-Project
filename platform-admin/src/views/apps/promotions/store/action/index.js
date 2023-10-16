import axios from 'axios'
import { handleLogout } from '@store/actions/auth'

const msPartner = process.env.REACT_APP_PARTNER_API

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    dispatch({
      type: 'LOADING_PARTNER'
    })
    await axios.get(`${msPartner}/api/partner`, { params: { ...params, clientId: params.clientId?.value, campaignId: params.campaignId?.value } }).then(response => {
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
          type: 'ERROR_PARTNER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Get partner
export const getPartner = id => {
  return async dispatch => {
    await axios
      .get(`${msPartner}/api/partner/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_PARTNER',
          selectedItem: response.data.data
        })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTNER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Get client
export const getClientes = () => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_PARTNER_API}/api/client/options`).then(response => {
      dispatch({
        type: 'GET_COMBO_CLIENTS',
        data: response.data.data
      })
    })
  }
}

// ** Get campaign
export const getCampanhas = (idClient) => {
  return async dispatch => {
    await axios.get(`${process.env.REACT_APP_PARTNER_API}/api/campaign/options/${idClient}`).then(response => {
      dispatch({
        type: 'GET_COMBO_CAMPAIGN',
        data: response.data.data
      })
    })
  }
}

// ** Add new partner
export const addPartner = item => {
  return (dispatch, getState) => {
    axios
      .post(`${msPartner}/api/partner`, item)
      .then(response => {
        dispatch({
          type: 'ADD_PARTNER',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().partners.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTNER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}
// ** Update a partner
export const updatePartner = item => {
  return (dispatch, getState) => {
    axios
      .put(`${msPartner}/api/partner`, item)
      .then(response => {
        dispatch({
          type: 'UPDATE_PARTNER',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().partners.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTNER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Delete partner
export const deletePartner = id => {
  return (dispatch, getState) => {
    axios
      .delete(`${msPartner}/api/partner/${id}`)
      .then(response => {
        dispatch({
          type: 'DELETE_PARTNER'
        })
      })
      .then(() => {
        dispatch(getData(getState().partners.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTNER',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Edit current item
export const editPartner = id => {
  return async dispatch => {
    dispatch({
      type: 'EDIT_PARTNER',
      currentId: id
    })
  }
}