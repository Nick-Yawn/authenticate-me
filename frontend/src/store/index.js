import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionUserReducer from './session';
import spotsReducer from './spots';
import amenitiesReducer from './amenity'
import districtsReducer from './district';
import spotToEditReducer from './spotToEdit';
import reviewsReducer from './reviews';

const rootReducer = combineReducers({
  session: sessionUserReducer,
  spots: spotsReducer,
  amenities: amenitiesReducer,
  districts: districtsReducer,
  spotToEdit: spotToEditReducer,
  reviews: reviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
