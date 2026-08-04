import { all } from 'redux-saga/effects';
import { studentSaga } from '../features/students/studentSaga';

export default function* rootSaga() {
  yield all([studentSaga()]);
}