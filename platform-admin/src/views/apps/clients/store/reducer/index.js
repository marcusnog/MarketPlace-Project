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
    case 'GET_CLIENT':
      return { ...state, selectedItem: action.selectedItem, loading: false }
    case 'ADD_CLIENT':
      return { ...state, loading: true }
    case 'UPDATE_CLIENT':
      return { ...state, loading: true }
    case 'DELETE_CLIENT':
      return { ...state, loading: true }
    case 'EDIT_CLIENT':
      return { ...state, currentId: action.currentId, loading: false }
    case 'ERROR_CLIENT':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_CLIENT':
    default:
      return { ...state }
  }
}
export default user
