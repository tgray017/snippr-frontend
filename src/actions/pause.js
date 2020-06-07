export const pause = () => {

  return (dispatch) => {
    dispatch({type: 'PAUSE'})
  }
}
