// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedItem: null
}

const participant = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.total,
        params: action.params,
        loading: false
      }
    case 'GET_PARTICIPANT':
      return { ...state, selectedItem: action.selectedItem, loading: false }
    case 'UPDATE_PARTICIPANT':
    return { ...state, loading: true }
    case 'DELETE_PARTICIPANT':
      return { ...state, loading: true }
    case 'EDIT_PARTICIPANT':
      return { ...state, currentId: action.currentId, loading: false }
    case 'ERROR_PARTICIPANT':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_PARTICIPANT':
      return { ...state, loading: true }
    case 'SET_CAMPAIGN':
      return { ...state, campaignId: action.campaignId }
    //case 'LOADING_PARTICIPANT_SIDEBAR':
    //return { ...state, loadingSidebar: true }
    //case 'GET_COMBO_SYSTEM':
    //return { ...state, loadingSidebar: false, comboSystem: action.data, comboProfile: [] }
    //case 'GET_COMBO_PROFILE':
    //return { ...state, loadingSidebar: false, comboProfile: action.data }
    default:
      return { ...state }
  }
}
export default participant
