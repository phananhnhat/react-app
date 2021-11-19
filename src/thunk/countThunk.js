export const fetchTrendingRequest = () => {
  return (dispatch) => {
    dispatch({
      type: 'test',
      payload: {},
    })
  }
}

export const fetchTrending = (trendings) => {
  return {
    type: 'test',
    trendings,
  }
}