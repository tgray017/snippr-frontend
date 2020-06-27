export default function alertReducer(state = {
  showAlert: false
}, action) {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        showAlert: true,
        status: action.payload.status,
        message: action.payload.message
      }

    case 'HIDE_ALERT':
      return {
        ...state,
        showAlert: false
      }

    default:
      return state
  }
}
