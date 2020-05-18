export const fetchPodcast = (id, nextEpisodePubDate = null) => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_PODCAST' })

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': '55c1a6eaea8046f890097b0e256d7e71'
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
