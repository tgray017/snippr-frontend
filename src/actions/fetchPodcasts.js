export const fetchPodcasts = () => {
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

    fetch('https://listen-api.listennotes.com/api/v2/search?q=star%20wars&only_in=title%2Cdescription', obj)
      .then(resp => resp.json())
      .then(podcasts => dispatch({ type: 'FETCH_PODCASTS', payload: podcasts }))
  }
}
