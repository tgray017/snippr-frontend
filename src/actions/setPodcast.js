export const setPodcast = (id) => {

  return (dispatch) => {
    dispatch({type: 'SET_PODCAST', payload: {
      id: id
    }})
  }
}
