// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedItem: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.total,
        params: action.params,
        loading: false
      }
    case 'GET_CAMPAIGN':
      return { ...state, selectedItem: action.selectedItem, loading: false }
    case 'ADD_CAMPAIGN':
      return { ...state, loading: true }
    case 'UPDATE_CAMPAIGN':
      return { ...state, loading: true }
    case 'DELETE_CAMPAIGN':
      return { ...state, loading: true }
    case 'EDIT_CAMPAIGN':
      return { ...state, currentId: action.currentId, loading: false }
    case 'ERROR_CAMPAIGN':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_CAMPAIGN':
      return { ...state, loading: true }
    case 'LOADING_CAMPAIGN_SIDEBAR':
      return { ...state, loadingSidebar: true }
    case 'GET_COMBO_SYSTEM':
      return { ...state, loadingSidebar: false, comboSystem: action.data, comboProfile: [] }
    case 'GET_COMBO_PROFILE':
      return { ...state, loadingSidebar: false, comboProfile: action.data }
    default:
      return { ...state }
  }
}
export default user
