let initialState = {
    loading: false,
    item: [],
    total: 0,
    error: null
  };
  
  function reducer(state = initialState, action: any) {
    var foundIndex = 0;
    var foundIndexCart = 0;
    var { item, total } = state;
    switch (action.type) {
      case "FETCH_DATA_REQUEST":
        return {
          ...state,
          loading: true,
          error: null
        };
      case "FETCH_DATA_SUCCESS":
        return {
          ...state,
          loading: false,
          item: action.item
        };
      case "FETCH_DATA_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          item: []
        };
      default:
        return state;
    }
  }
  
  export default reducer;
  