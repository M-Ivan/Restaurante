import {
  ADD_FAVORITES,
  FAVORITES_FAILED,
  FAVORITES_LOADING,
} from "../constants/favoritesConstants";

export const favoritesReducer = (
  state = {
    isLoading: true,
    errMess: null,
    favorites: null,
    success: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        success: true,
        favorites: action.payload,
      };

    case FAVORITES_LOADING:
      return { ...state, isLoading: true, errMess: null, favorites: null };

    case FAVORITES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        favorites: null,
        success: false,
      };

    default:
      return state;
  }
};
