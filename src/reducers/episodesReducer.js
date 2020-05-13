export default function episodesReducer(state = {
  results: [],
  requesting: false
}, action) {
  switch (action.type) {
    case 'START_FETCHING_EPISODES':
      return {
        ...state,
        results: [...state.results],
        requesting: true
      }

    case 'FETCH_EPISODES':
      return {
        ...state,
        results: action.payload.results,
        requesting: false
      }

    default:
      return state
  }
}
