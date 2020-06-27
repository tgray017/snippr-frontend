export const setSnipStopTime = (stopTime) => {

  return (dispatch) => {
    dispatch({type: 'SET_SNIP_STOP_TIME', payload: {
      snipStopTime: stopTime
    }})
  }
}
