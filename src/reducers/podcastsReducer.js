export default function podcastsReducer(state = {
  results: [],
  offset: 0,
  requesting: false,
  currentPodcast: {
    previousPages: []
  }
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

    case 'UPDATE_PODCASTS_OFFSET':
      return {
        ...state,
        offset: action.payload.offset
      }

    case 'UPDATE_NEXT_EPISODE_PUB_DATE':
      return {
        ...state,
        currentPodcast: {
          ...state.currentPodcast,
          nextEpisodePubDate: action.payload.nextEpisodePubDate
        }
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
          ...state.currentPodcast,
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
          earliestEpisodePubDate: action.payload.earliest_pub_date_ms,
          episodes: action.payload.episodes
        },
        requesting: false
      }

    case 'START_FETCHING_EPISODES':
      return {
        ...state,
        requesting: true
      }

    /* rename this to ADD_PREV_PAGE */
    case 'TRACK_PREV_PAGE':
      return {
        ...state,
        currentPodcast: {
          ...state.currentPodcast,
          previousPages: state.currentPodcast.previousPages.concat(action.payload.episodePubDate)
        }
      }

    /* rename this to REMOVE_PREV_PAGE */
    case 'UPDATE_PREV_PAGES':
      return {
        ...state,
        currentPodcast: {
          ...state.currentPodcast,
          previousPages: state.currentPodcast.previousPages.slice(0, -1)
        }
      }

    case 'FETCH_EPISODES':
      return {
        ...state,
        currentPodcast: {
          ...state.currentPodcast,
          nextEpisodePubDate: action.payload.next_episode_pub_date,
          episodes: action.payload.episodes
        },
        requesting: false
      }

    default:
      return state
  }
}
