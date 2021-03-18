import {
  ADD_LEADERS,
  LEADERS_FAILED,
  LEADERS_LOADING,
} from "../constants/leadersConstants";

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch("/api/leaders")
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
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ADD_LEADERS,
  payload: leaders,
});

export const postFeedback = (feedback) => (dispatch) => {
  return fetch("/api/feedback", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json",
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
    .then((response) => {
      console.log("Feedback", response);
      alert("Gracias por tu Feedback\n" + JSON.stringify(response));
    })
    .catch((error) => {
      console.log("Feedback", error.message);
      alert("Tu Feedback no se pudo enviar\nError: " + error.message);
    });
};
