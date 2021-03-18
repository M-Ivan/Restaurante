import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/userConstants";
import { favoritesFailed, fetchFavorites } from "./favoritesActions";

export const requestLogin = (creds) => {
  return {
    type: LOGIN_REQUEST,
    creds,
  };
};

export const receiveLogin = (response) => {
  return {
    type: LOGIN_SUCCESS,
    token: response.token,
    admin: response.admin,
  };
};

export const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    message,
  };
};

export const requestRegister = (creds) => {
  return {
    type: REGISTER_REQUEST,
    creds,
  };
};

export const receiveRegister = (response) => {
  return {
    type: REGISTER_SUCCESS,
    token: response.token,
  };
};
export const registerError = (message) => {
  return {
    type: REGISTER_FAILURE,
    message,
  };
};

// export const register = (firstname, lastname, username, password) => async (
//  dispatch) => {
//  dispatch({
//   type: REGISTER_REQUEST,
//   payload: { username, password },
//  });
//  try {
//    const { data } = await Axios.post( "/users/signup", {
//     creds
//    });
//   console.log("data", data);
//    dispatch({ type: REGISTER_SUCCESS, payload: data });
//    dispatch({ type: LOGIN_SUCCESS, payload: data });
//    localStorage.setItem("userInfo", JSON.stringify(data));
//  } catch (error) {
//    dispatch({
//      type: REGISTER_FAILURE,
//      payload:
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message,
//   });
//  }
//};

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(
    "/api/users/login",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    }
  )
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
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        localStorage.setItem("admin", response.admin);
        // Dispatch the success action
        dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

export const registerUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestRegister(creds));

  return fetch(
    "/api/users/signup",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    }
  )
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
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        dispatch(fetchFavorites());
        dispatch(receiveRegister(response));
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(registerError(error.message)));
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const receiveLogout = (response) => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  localStorage.removeItem("admin");
  dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
};
