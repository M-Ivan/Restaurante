import * as ActionTypes from "./ActionTypes";

export const Dishes = (
  state = {
    isLoading: true,
    errMess: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dishes: [],
      };
    default:
      return state;
  }
};

export const dishCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_DISH_REQUEST:
      return { loading: true };
    case ActionTypes.CREATE_DISH_SUCCESS:
      return { loading: false, success: true, dish: action.payload };
    case ActionTypes.CREATE_DISH_FAILED:
      return { loading: false, error: action.payload };
    case ActionTypes.CREATE_DISH_RESET:
      return {};
    default:
      return state;
  }
};

export const dishDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.DELETE_DISH_REQUEST:
      return { loading: true };
    case ActionTypes.DELETE_DISH_SUCCESS:
      return { loading: false, success: true };
    case ActionTypes.DELETE_DISH_FAILED:
      return { loading: false, error: action.payload };
    case ActionTypes.DELETE_DISH_RESET:
      return {};
    default:
      return state;
  }
};

export const dishUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_DISH_REQUEST:
      return { loading: true };
    case ActionTypes.UPDATE_DISH_SUCCESS:
      return { loading: false, success: true };
    case ActionTypes.UPDATE_DISH_SUCCESS:
      return { loading: false, error: action.payload };
    case ActionTypes.UPDATE_DISH_RESET:
      return {};
    default:
      return state;
  }
};
