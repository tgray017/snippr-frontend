export const setAudio = (audioId, audioUrl, podcastName, podcastId, description) => {
  return (dispatch) => {
    console.log(audioUrl)
    console.log(podcastName)
    dispatch({type: 'SET_AUDIO', payload: {
      audioId: audioId,
      audioUrl: audioUrl,
      podcastName: podcastName,
      podcastId: podcastId,
      description: description
    }})
  }
}
