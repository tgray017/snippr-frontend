export default function podcastsReducer(state = {
  results: [],
  offset: 0,
  requesting: false,
  currentPodcast: {}
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

    case 'START_FETCHING_PODCAST':
      return {
        ...state,
        requesting: true
      }

    case 'FETCH_PODCAST':
      return {
        ...state,
        currentPodcast: {
          id: action.payload.id,
          title: action.payload.title,
          publisher: action.payload.publisher,
          image: action.payload.image,
          thumbnail: action.payload.thumbnail,
          totalEpisodes: action.payload.total_episodes,
          description: action.payload.description,
          language: action.payload.language,
          lastAirDate: action.payload.latest_pub_date_ms,
          nextEpisodePubDate: action.payload.next_episode_pub_date,
          episodes: action.payload.episodes
        },
        requesting: false
      }

    default:
      return state
  }
}
