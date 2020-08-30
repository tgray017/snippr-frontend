export const fetchEpisodes = (podcastId, nextEpisodePubDate, direction) => {
  return (dispatch) => {
    /* can we ignore the payload in this dispatch? */
    dispatch({ type: 'START_FETCHING_EPISODES' })

    if(direction === 'next') {
      dispatch({ type: 'TRACK_PREV_PAGE', payload: {episodePubDate: nextEpisodePubDate} })
    }

    let obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-ListenAPI-Key': '55c1a6eaea8046f890097b0e256d7e71'
      }
    }

    let url = `https://listen-api.listennotes.com/api/v2/podcasts/${podcastId}?next_episode_pub_date=${nextEpisodePubDate}`

    fetch(url, obj)
      .then(resp => resp.json())
      .then(results => dispatch({ type: 'FETCH_EPISODES', payload: results }))
  }
}
