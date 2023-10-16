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
    case 'ERROR_USER':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_USER':
      return { ...state, loading: true }
    default:
      return { ...state }
  }
}
export default user
