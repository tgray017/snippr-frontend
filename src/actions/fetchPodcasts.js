export const fetchPodcasts = (input, offset = 0) => {
  return (dispatch) => {
    dispatch({ type: 'START_FETCHING_PODCASTS' })

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': '55c1a6eaea8046f890097b0e256d7e71'
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
