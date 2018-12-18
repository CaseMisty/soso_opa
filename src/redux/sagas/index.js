import { all } from 'redux-saga/effects';
import { watchLaunchLoginRequest } from './loginModel';
export default function *rootSaga() {
  yield all([
    watchLaunchLoginRequest()
  ]);
}