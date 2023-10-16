import axios from 'axios'
import { handleLogout } from '@store/actions/auth'

const msParticipant = process.env.REACT_APP_USER_API

// ** Get data on page or row change
export const getData = params => {
  const { id } = params
  const { q, page, limit, status } = params
  return async dispatch => {
    dispatch({
      type: 'LOADING_PARTICIPANT'
    })
    await axios.get(`${msParticipant}/api/UserParticipant/${id}`, { params:{q, page, limit, status }}).then(response => {
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
        type: 'ERROR_PARTICIPANT',
        errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
      })
    })
  }
}

// ** Get User
export const getParticipant = id => {
  return async dispatch => {
    await axios
      .get(`${msParticipant}/api/UserParticipant/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_PARTICIPANT',
          selectedItem: response.data.data
        })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTICIPANT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

// ** Get User
export const addClient = id => {
  return async dispatch => {
    await axios
      .get(`${msParticipant}/api/UserParticipant/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_PARTICIPANT',
          selectedItem: response.data.data
        })
      })
      .catch(err => {
        console.log(err)
        if (err.response.status === 401) {
          dispatch(handleLogout())
        }
        dispatch({
          type: 'ERROR_PARTICIPANT',
          errorMessage: err.response.data || 'Ocorreu um erro ao realizar a ação'
        })
      })
  }
}

export const uploadParticipantFileWithCampaignId = (file, id) => async (dispatch) => {
  const campaignId = id

  try {
    const formData = new FormData()
    formData.append('File', file)
    formData.append('CampaignId', campaignId)

    const response = await axios.post(
      'http://20.226.77.29/userapi/api/UserParticipant/ImportParticipants/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    dispatch({ type: 'UPLOAD_SUCCESS', payload: response.data })
  } catch (error) {
    // Tratar erros, se necessário
    dispatch({ type: 'UPLOAD_FAILURE', payload: error.message })
    throw error.message
  }
}

export const uploadPointsFileWithCampaignId = (file, id) => async (dispatch) => {
  const campaignId = id

  try {
    const formData = new FormData()
    formData.append('File', file)
    formData.append('CampaignId', campaignId)

    const response = await axios.post(
      'http://20.226.77.29/userapi/api/userparticipant/ImportDistributePoints',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if (response.data.success === true) {
      dispatch({ type: 'UPLOAD_SUCCESS', payload: response.data })
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    // Tratar erros, se necessário
    dispatch({ type: 'UPLOAD_FAILURE', payload: error.message })
    throw error.message
  }
}

// ** Delete User
export const deleteParticipant =  (id, campaignId) => {
  return (dispatch, getState) => {
    axios
      .delete(`${msParticipant}/api/UserParticipant/${campaignId}/${id}`)
      .then(response => {
        dispatch({
          type: 'DELETE_PARTICIPANT'
        })
      })
      .then(() => {
        dispatch(getData(getState().participant.params))
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
export const editParticipant = id => {
  return async dispatch => {
    dispatch({
      type: 'EDIT_PARTICIPANT',
      currentId: id
    })
  }
}

export const setCampaign = id => {
  return async dispatch => {
    dispatch({
      type: 'SET_CAMPAIGN',
      campaignId: id
    })
  }
}