const initialState = {
  nominatedMovies: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOMINATED_MOVIES":
      let newList;
      if (Array.isArray(action.data)) {
        newList = [...state.nominatedMovies, ...action.data];
      } else {
        newList = [...state.nominatedMovies, action.data];
      }
      const jsonList = JSON.stringify(newList);
      localStorage.setItem("movies", jsonList);
      return {
        nominatedMovies: newList,
      };
    case "REMOVE_NOMINATED_MOVIE":
      const filteredItems = state.nominatedMovies.filter((item) => {
        if (item.imdbID === action.data) {
          return false;
        }
        return true;
      });
      localStorage.setItem("movies", filteredItems);
      return {
        nominatedMovies: filteredItems,
      };
    default:
      return state;
  }
};

export default rootReducer;
