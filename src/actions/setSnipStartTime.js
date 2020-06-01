export const setSnipStartTime = (startTime) => {

  return (dispatch) => {
    dispatch({type: 'SET_SNIP_START_TIME', payload: {
      snipStartTime: startTime
    }})
  }
}
