import axios from 'axios'
import { handleLogout } from '@store/actions/auth'

const msCampaign = process.env.REACT_APP_PARTNER_API

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    dispatch({
      type: 'LOADING_CAMPAIGN'
    })
    await axios.get(`${msCampaign}/api/campaign`, { params }).then(response => {
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
        type: 'ERROR_CAMPAIGN',
        errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      })
    })
  }
}

// ** Add new Campaign
export const AddCampaign = item => {
  return (dispatch, getState) => {
    axios
      .post(`${msCampaign}/api/campaign/create`, item)
      .then(response => {
        dispatch({
          type: 'ADD_CAMPAIGN',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().campaign.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CAMPAIGN',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Update a User
export const updateCampaign = item => {
  return (dispatch, getState) => {
    axios
      .put(`${msCampaign}/api/campaign`, item)
      .then(response => {
        dispatch({
          type: 'UPDATE_CAMPAIGN',
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().campaign.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CAMPAIGN',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Delete User
export const deleteCampaign = id => {
  return (dispatch, getState) => {
    axios
      .delete(`${msCampaign}/api/campaign/${id}`)
      .then(response => {
        dispatch({
          type: 'DELETE_CAMPAIGN'
        })
      })
      .then(() => {
        dispatch(getData(getState().campaign.params))
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_CAMPAIGN',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Edit current item
export const editCampaign = id => {
  return async dispatch => {
    dispatch({
      type: 'EDIT_CAMPAIGN',
      currentId: id
    })
  }
}

export const getSystems = () => {
  return async dispatch => {
    dispatch({
      type: 'LOADING_CAMPAIGN_SIDEBAR'
    })
    await axios.get(`${msCampaign}/api/client/options`).then(response => {
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
        type: 'ERROR_CAMPAIGN',
        errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      })
    })
  }
}

//export const getProfiles = (systemId) => {
  //return async dispatch => {
    //dispatch({
     // type: 'LOADING_CAMPAIGN_SIDEBAR'
    //})
    //await axios.get(`${msCampaign}/api/Profile/options/${systemId}`).then(response => {
      //dispatch({
        //type: 'GET_COMBO_PROFILE',
        //data: response.data.data
      //})
    //})
    //.catch(err => {
     // console.log(err)
      //if (err.response.status === 401) {
       // dispatch(handleLogout())
      //}
      //dispatch({
       // type: 'ERROR_CAMPAIGN',
        //errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      //})
    //})
  //}
//}