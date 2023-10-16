// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedItem: null
}

const partners = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.total,
        params: action.params,
        loading: false
      }
    case 'GET_PARTNER':
      return { ...state, selectedItem: action.selectedItem, loading: false }
    case 'ADD_PARTNER':
      return { ...state, loading: true }
    case 'UPDATE_PARTNER':
      return { ...state, loading: true }
    case 'DELETE_PARTNER':
      return { ...state, loading: true }
    case 'EDIT_PARTNER':
      return { ...state, currentId: action.currentId, loading: false }
    case 'ERROR_PARTNER':
      return { ...state, errorMessage: action.errorMessage, loading: false }
    case 'LOADING_PARTNER':
      return { ...state, loading: true }
    case 'GET_COMBO_CLIENTS':
      return { ...state, comboClients: action.data }
    case 'GET_COMBO_CAMPAIGN':
      return { ...state, comboCampaigns: action.data }
    default:
      return { ...state }
  }
}
export default partners
