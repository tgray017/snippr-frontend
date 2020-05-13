export const updateSearchInput = (searchInput) => {

  return (dispatch) => {
    dispatch({type: 'UPDATE_SEARCH_INPUT', payload: {
      searchInput: searchInput
    }})
  }
}
