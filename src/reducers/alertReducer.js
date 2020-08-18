export default function alertReducer(state = {
  showAlert: false,
  downloading: false
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

    case 'START_DOWNLOADING_SNIP':
      return {
        ...state,
        downloading: true
      }

    case 'STOP_DOWNLOADING_SNIP':
      return {
        ...state,
        downloading: false
      }

    default:
      return state
  }
}
