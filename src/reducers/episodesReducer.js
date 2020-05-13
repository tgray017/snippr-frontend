export default function episodesReducer(state = {
  results: [],
  requesting: false
}, action) {
  switch (action.type) {
    case 'START_FETCHING_EPISODES':
      return {
        ...state,
        requesting: true
      }

    case 'FETCH_EPISODES':
      return {
        ...state,
        results: action.payload.episodes,
        requesting: false
      }

    default:
      return state
  }
}
