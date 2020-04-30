export default function podcastsReducer(state = {
  results: [],
  requesting: false
}, action) {
  switch (action.type) {
    case 'START_FETCHING_PODCASTS':
      return {
        ...state,
        results: [...state.results],
        requesting: true
      }

    case 'FETCH_PODCASTS':
      return {
        ...state,
        results: action.payload.results,
        requesting: false
      }

    default:
      return state
  }
}
