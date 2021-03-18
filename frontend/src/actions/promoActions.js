import {
  ADD_PROMOS,
  PROMOS_FAILED,
  PROMOS_LOADING,
} from "../constants/promosConstants";

export const promosLoading = () => ({
  type: PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ADD_PROMOS,
  payload: promos,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch("/api/promotions")
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
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};
