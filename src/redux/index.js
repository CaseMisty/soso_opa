import { all } from 'redux-saga/effects';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { watchLaunchLoginRequest } from './loginModel';
import { loginStore } from './loginModel'

function *rootSaga() {
  yield all([
    watchLaunchLoginRequest()
  ]);
}

const rootReducer = combineReducers({
  loginStore
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);
