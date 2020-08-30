export const updateOffset = (offset) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_PODCASTS_OFFSET', payload: {
      offset: offset
    }})
  }
}
