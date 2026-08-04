import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  fetchStudentsApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
} from './services/studentApi';
import {
  getStudentsFetch,
  getStudentsSuccess,
  addStudentFetch,
  addStudentSuccess,
  updateStudentFetch,
  updateStudentSuccess,
  deleteStudentFetch,
  deleteStudentSuccess,
  studentOperationFailure,
} from './studentSlice';

// 1. Fetch Students Saga
function* workGetStudents() {
  try {
    const response = yield call(fetchStudentsApi);
    yield put(getStudentsSuccess(response.data));
  } catch (error) {
    yield put(studentOperationFailure(error.message));
  }
}

// 2. Add Student Saga
function* workAddStudent(action) {
  try {
    const response = yield call(createStudentApi, action.payload);
    yield put(addStudentSuccess(response.data));
  } catch (error) {
    yield put(studentOperationFailure(error.message));
  }
}

// 3. Update Student Saga
function* workUpdateStudent(action) {
  try {
    const { id, studentData } = action.payload;
    const response = yield call(updateStudentApi, id, studentData);
    yield put(updateStudentSuccess(response.data));
  } catch (error) {
    yield put(studentOperationFailure(error.message));
  }
}

// 4. Delete Student Saga
function* workDeleteStudent(action) {
  try {
    yield call(deleteStudentApi, action.payload);
    yield put(deleteStudentSuccess(action.payload));
  } catch (error) {
    yield put(studentOperationFailure(error.message));
  }
}

// Watcher Saga
export function* studentSaga() {
  yield takeLatest(getStudentsFetch.type, workGetStudents);
  yield takeEvery(addStudentFetch.type, workAddStudent);
  yield takeEvery(updateStudentFetch.type, workUpdateStudent);
  yield takeEvery(deleteStudentFetch.type, workDeleteStudent);
}