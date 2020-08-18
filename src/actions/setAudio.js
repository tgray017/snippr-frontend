export const setAudio = (audioId, audioUrl, podcastName, podcastId) => {
  return (dispatch) => {
    dispatch({type: 'SET_AUDIO', payload: {
      audioId: audioId,
      audioUrl: audioUrl,
      podcastName: podcastName,
      podcastId: podcastId
    }})
  }
}
