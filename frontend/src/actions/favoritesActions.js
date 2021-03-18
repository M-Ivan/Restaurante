import {
  ADD_FAVORITES,
  FAVORITES_FAILED,
  FAVORITES_LOADING,
} from "../constants/favoritesConstants";

export const postFavorite = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  return fetch("/api/favorites/" + dishId, {
    method: "POST",
    body: JSON.stringify({ _id: dishId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
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
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorito agregado", favorites);
      dispatch(addFavorites(favorites));
      dispatch(fetchFavorites());
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const deleteFavorite = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch("/api/favorites/" + dishId, {
    method: "DELETE",
    headers: {
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
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
        throw error;
      }
    )
    .then((response) => response.json())
    .then((favorites) => {
      console.log("Favorito Eliminado", favorites);
      dispatch(addFavorites(favorites));
      dispatch(fetchFavorites());
    })
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
  dispatch(favoritesLoading(true));

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch("/api/favorites", {
    headers: {
      Authorization: bearer,
    },
  })
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
    .then((favorites) => dispatch(addFavorites(favorites)))
    .catch((error) => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: FAVORITES_LOADING,
});

export const favoritesFailed = (errmess) => ({
  type: FAVORITES_FAILED,
  payload: errmess,
});

export const addFavorites = (favorites) => ({
  type: ADD_FAVORITES,
  payload: favorites,
});
