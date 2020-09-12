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
