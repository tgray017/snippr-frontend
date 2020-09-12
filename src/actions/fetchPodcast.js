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
