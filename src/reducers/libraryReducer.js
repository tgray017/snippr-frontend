export default function libraryReducer(state = {
  library: null
}, action) {
  switch (action.type) {
    case 'FETCH_LIBRARY':
      return {
        ...state,
        library: action.payload.library
      }

    default:
      return state
  }
}
