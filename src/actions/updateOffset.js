export const updateOffset = (offset) => {
  
  return (dispatch) => {
    dispatch({type: 'UPDATE_OFFSET', payload: {
      offset: offset
    }})
  }
}
