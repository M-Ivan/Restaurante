import {
  ADD_COMMENT,
  ADD_COMMENTS,
  COMMENTS_FAILED,
} from "../constants/commentsConstants";

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, comment) => (dispatch) => {
  const newComment = {
    dish: dishId,
    rating: rating,
    comment: comment,
  };
  console.log("Comment ", newComment);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify(newComment),
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
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("Post comments ", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const fetchComments = () => (dispatch) => {
  return fetch("/api/comments")
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
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ADD_COMMENTS,
  payload: comments,
});
