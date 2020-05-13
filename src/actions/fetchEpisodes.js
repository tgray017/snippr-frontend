export const fetchEpisodes = podcastId => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_EPISODES' })

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': '55c1a6eaea8046f890097b0e256d7e71'
      }
    }

    let url = `https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}`

    fetch(url, obj)
      .then(resp => resp.json())
      .then(results => dispatch({ type: 'FETCH_EPISODES', payload: results }))
      /*.then(episodes => dispatch({ type: 'FETCH_EPISODES', payload: episodes }))*/
  }
}
