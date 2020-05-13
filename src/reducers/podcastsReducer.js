export default function podcastsReducer(state = {
  results: [],
  offset: 0,
  requesting: false
}, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_INPUT':
      return {
        ...state,
        searchInput: action.payload.searchInput,
        offset: 0
      }

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
        nextOffset: action.payload.next_offset,
        requesting: false
      }

    case 'UPDATE_OFFSET':
      return {
        ...state,
        offset: action.payload.offset
      }

    case 'SET_PODCAST':
      return {
        ...state,
        podcastId: action.payload.id
      }

    default:
      return state
  }
}
