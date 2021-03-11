import {
  DISHES_LOADING,
  DISHES_FAILED,
  ADD_DISHES,
  UPDATE_DISH_REQUEST,
  UPDATE_DISH_SUCCESS,
  UPDATE_DISH_FAILED,
  CREATE_DISH_REQUEST,
  CREATE_DISH_SUCCESS,
  CREATE_DISH_FAILED,
  DELETE_DISH_REQUEST,
  DELETE_DISH_SUCCESS,
  DELETE_DISH_FAILED,
} from "../constants/dishConstants";
import { baseUrl } from "../shared/baseUrl";
import Axios from "axios";

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ADD_DISHES,
  payload: dishes,
});

export const createDish = () => async (dispatch) => {
  dispatch({ type: CREATE_DISH_REQUEST });
  const bearer = "Bearer " + localStorage.getItem("token");
  try {
    const { data } = await Axios.post(
      baseUrl + "dishes/",
      {},
      {
        headers: { Authorization: bearer },
      }
    );
    dispatch({ type: CREATE_DISH_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_DISH_FAILED, payload: message });
  }
};

export const deleteDish = (dishId) => async (dispatch) => {
  dispatch({ type: DELETE_DISH_REQUEST, payload: dishId });
  const bearer = "Bearer " + localStorage.getItem("token");

  try {
    const { data } = Axios.delete(baseUrl + `dishes/${dishId}`, {
      headers: { Authorization: bearer },
    });
    dispatch({ type: DELETE_DISH_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_DISH_FAILED, payload: message });
  }
};

export const updateDish = (dish) => async (dispatch) => {
  dispatch({ type: UPDATE_DISH_REQUEST, payload: dish });
  const bearer = "Bearer " + localStorage.getItem("token");

  try {
    const { data } = await Axios.put(baseUrl + `dishes/${dish._id}`, dish, {
      headers: { Authorization: bearer },
    });
    dispatch({ type: UPDATE_DISH_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_DISH_FAILED, error: message });
  }
};
