import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import {
  dishCreateReducer,
  dishDeleteReducer,
  dishesReducer,
  dishUpdateReducer,
} from "../reducers/dishReducers";
import { commentsReducer } from "../reducers/commentsReducer";
import { favorites } from "./favorites";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback } from "./forms";
import { authReducer } from "../reducers/authReducer";
import { leadersReducer } from "../reducers/leadersReducer";
import { promotionsReducer } from "../reducers/promotionsReducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: dishesReducer,
      comments: commentsReducer,
      promotions: promotionsReducer,
      leaders: leadersReducer,
      auth: authReducer,
      dishCreate: dishCreateReducer,
      dishDelete: dishDeleteReducer,
      dishUpdate: dishUpdateReducer,
      favorites,
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
