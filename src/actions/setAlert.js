export const setAlert = (status, message) => {

  return (dispatch) => {
    dispatch({type: 'SET_ALERT', payload: {
      status: status,
      message: message
    }})
  }
}
