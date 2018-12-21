import { all } from 'redux-saga/effects';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { watchLaunchLoginRequest, loginStore } from './loginModel';
import { watchers as userListWatcher, userlist } from './userListModal';
import { watchers as authListWatcher, authlist } from './authListModel';

function* rootSaga() {
  yield all([
    watchLaunchLoginRequest(),

    userListWatcher.queryUserInfo(),
    userListWatcher.selectedUser(),

    authListWatcher.queryAuthInfo(),
    authListWatcher.updateAuthToPass(),
    authListWatcher.updateAuthToReject(),
    authListWatcher.queryChangePending(),
    authListWatcher.selectedAuth()
  ]);
}

const rootReducer = combineReducers({
  loginStore,
  userlist,
  authlist
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);
