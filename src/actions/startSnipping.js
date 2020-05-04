export const startSnipping = (startTime) => {

  return (dispatch) => {
    dispatch({type: 'START_SNIPPING', payload: {
      startTime: startTime
    }})
  }
}
