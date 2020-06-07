export const stopSnipping = () => {

  return (dispatch) => {
    dispatch({type: 'STOP_SNIPPING'})
  }
}
