export const fetchEpisodes = (podcastId, nextEpisodePubDate, direction) => {
  return (dispatch) => {
    /* can we ignore the payload in this dispatch? */
    dispatch({ type: 'START_FETCHING_EPISODES' })

    if(direction === 'next') {
      dispatch({ type: 'TRACK_PREV_PAGE',
        payload: {episodePubDate: nextEpisodePubDate}
      })
    }

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': `${process.env.REACT_APP_LISTEN_NOTES_API_KEY}`
      }
    }

    let url = `https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}?next_episode_pub_date=${nextEpisodePubDate}`

    fetch(url, obj)
      .then(resp => resp.json())
      .then(results => dispatch({ type: 'FETCH_EPISODES', payload: results }))
  }
}


export const fetchPodcast = (id, nextEpisodePubDate = null) => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_PODCAST' })

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': `${process.env.REACT_APP_LISTEN_NOTES_API_KEY}`
      }
    }

    let url = `https://listen-api.listennotes.com/api/v2/podcasts/${id}?next_episode_pub_date=${nextEpisodePubDate}`

    fetch(url, obj)
      .then(resp => resp.json())
      .then(podcast => {
        dispatch({ type: 'FETCH_PODCAST', payload: podcast })
      })
  }
}

export const fetchPodcasts = (input, offset = 0) => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_PODCASTS' })

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': `${process.env.REACT_APP_LISTEN_NOTES_API_KEY}`
      }
    }

    let url = `https://listen-api.listennotes.com/api/v2/search?q=${input}&type=podcast&language=English&offset=${offset}`

    fetch(url, obj)
      .then(resp => resp.json())
      .then(podcasts => {
        dispatch({ type: 'FETCH_PODCASTS', payload: podcasts })
      })
  }
}

export const updateOffset = (offset) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_PODCASTS_OFFSET', payload: {
      offset: offset
    }})
  }
}

export const updatePrevPages = () => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_PREV_PAGES'})
  }
}

export const updateSearchInput = (searchInput) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_SEARCH_INPUT', payload: {
      searchInput: searchInput
    }})
  }
}
