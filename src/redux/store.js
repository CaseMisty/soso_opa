import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './sagas';

import { navBarStore } from './reducer/navBar';
import { loginStore } from './sagas/loginModel'

const rootReducer = combineReducers({
  navBarStore,
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
