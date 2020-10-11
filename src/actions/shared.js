export const hideAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_ALERT'})
  }
}

export const setAlert = (status, message) => {
  return (dispatch) => {
    dispatch({type: 'SET_ALERT', payload: {
      status: status,
      message: message
    }})
  }
}
