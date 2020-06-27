export const hideAlert = () => {

  return (dispatch) => {
    dispatch({type: 'HIDE_ALERT'})
  }
}
