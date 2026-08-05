import { all } from 'redux-saga/effects';
import { studentSaga } from '../features/students/studentSaga';
import { authSaga } from '../features/auth/authSaga';

export default function* rootSaga() {
  yield all([studentSaga(), authSaga()]);
}