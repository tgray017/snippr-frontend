export const stopSnipping = (endTime) => {

  return (dispatch) => {
    dispatch({type: 'STOP_SNIPPING', payload: {
      endTime: endTime
    }})
  }
}
