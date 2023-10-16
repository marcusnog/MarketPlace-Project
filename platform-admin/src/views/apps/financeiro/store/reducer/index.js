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
    case 'GET_USER':
      return { ...state, selectedItem: action.selectedItem, loading: false }
    case 'ADD_USER':
      return { ...state, loading: true }
    case 'UPDATE_USER':
      return { ...state, loading: true }
    case 'DELETE_USER':
      return { ...state, loading: true }
    case 'EDIT_USER':
      return { ...state, currentId: action.currentId, loading: false }
    case 'ERROR_USER':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_USER':
      return { ...state, loading: true }
    case 'LOADING_USER_SIDEBAR':
      return { ...state, loadingSidebar: true }
    case 'GET_COMBO_SYSTEM':
      return { ...state, loadingSidebar: false, comboSystem: action.data, comboProfile: [] }
    case 'GET_COMBO_PROFILE':
      return { ...state, loadingSidebar: false, comboProfile: action.data }
    case 'ADD_POINTS':
      return { ...state, loading: true }
    case 'ERROR_POINTS':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    default:
      return { ...state }
  }
}
export default user
