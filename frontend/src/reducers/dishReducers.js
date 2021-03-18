import {
  ADD_DISHES,
  CREATE_DISH_FAILED,
  CREATE_DISH_REQUEST,
  CREATE_DISH_RESET,
  CREATE_DISH_SUCCESS,
  DELETE_DISH_FAILED,
  DELETE_DISH_REQUEST,
  DELETE_DISH_RESET,
  DELETE_DISH_SUCCESS,
  DISHES_FAILED,
  DISHES_LOADING,
  DISH_LIST_FAILED,
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  UPDATE_DISH_FAILED,
  UPDATE_DISH_REQUEST,
  UPDATE_DISH_RESET,
  UPDATE_DISH_SUCCESS,
} from "../constants/dishConstants";

export const dishesReducer = (
  state = {
    isLoading: true,
    errMess: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case DISHES_LOADING:
      return { ...state, isLoading: true, errMess: null, dishes: [] };
    case DISHES_FAILED:
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

export const dishesListReducer = (
  state = { loading: true, dishes: [] },
  action
) => {
  switch (action.type) {
    case DISH_LIST_REQUEST:
      return { loading: true };
    case DISH_LIST_SUCCESS:
      return { loading: false, dishes: action.payload };
    case DISH_LIST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dishCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DISH_REQUEST:
      return { loading: true };
    case CREATE_DISH_SUCCESS:
      return { loading: false, success: true, dish: action.payload };
    case CREATE_DISH_FAILED:
      return { loading: false, error: action.payload };
    case CREATE_DISH_RESET:
      return {};
    default:
      return state;
  }
};

export const dishDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DISH_REQUEST:
      return { loading: true };
    case DELETE_DISH_SUCCESS:
      return { loading: false, success: true };
    case DELETE_DISH_FAILED:
      return { loading: false, error: action.payload };
    case DELETE_DISH_RESET:
      return {};
    default:
      return state;
  }
};

export const dishUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DISH_REQUEST:
      return { loading: true };
    case UPDATE_DISH_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_DISH_FAILED:
      return { loading: false, error: action.payload };
    case UPDATE_DISH_RESET:
      return {};
    default:
      return state;
  }
};
