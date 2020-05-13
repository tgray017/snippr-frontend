export const fetchEpisodes = input => {
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

    let url = `https://listen-api.listennotes.com/api/v2/search?q=${input}&type=episode`
    /*&only_in=title%2Cdescription*/

    fetch(url, obj)
      .then(resp => resp.json())
      .then(podcasts => dispatch({ type: 'FETCH_EPISODES', payload: podcasts }))
      .then(() => console.log(url))
  }
}
