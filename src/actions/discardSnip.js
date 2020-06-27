export const discardSnip = () => {

  return (dispatch) => {
    dispatch({type: 'DISCARD_SNIP'})
  }
}
