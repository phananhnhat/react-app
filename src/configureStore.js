import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from "redux-saga";
import thunk from 'redux-thunk'


import countReducer from './reducer/countReducer'
import todosReducer from './reducer/todosReducer'

import countSaga from './sagas/countSaga'
import customMiddleware from "./middleware/customMiddleware";
import custom1Middleware from "./middleware/custom1Middleware";

const staticReducers = {
  counter: countReducer,
  todos: todosReducer
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}

const sagaMiddleware = createSagaMiddleware()
// const middleWares = [sagaMiddleware, thunk, customMiddleware, custom1Middleware];
const middleWares = [sagaMiddleware, thunk];

export default function configureStore(preloadedState) {
  const store = createStore(
    createReducer(),
    applyMiddleware(...middleWares),
  );

  sagaMiddleware.run(countSaga);

  // Add a dictionary to keep track of the registered async reducers
  // store.asyncReducers = {}

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  // store.injectReducer = (key, asyncReducer) => {
  //   store.asyncReducers[key] = asyncReducer
  //   store.replaceReducer(createReducer(store.asyncReducers))
  // }

  return store;
}