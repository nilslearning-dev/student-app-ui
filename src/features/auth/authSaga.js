import { call, put, takeLatest } from 'redux-saga/effects';
import API from '../../services/api';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';

function* workLogin(action) {
  try {
    const response = yield call(API.post, '/auth/login', action.payload);
    const responseData = response.data;

    if (responseData?.success) {
      const user = responseData.data || {};
      yield put(
        loginSuccess({
          user: { id: user.id, userName: user.userName },
          message: responseData.message || 'Login successful',
        })
      );
    } else {
      yield put(loginFailure(responseData?.message || 'Login failed'));
    }
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Login failed';
    yield put(loginFailure(message));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, workLogin);
}
