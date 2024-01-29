import { call, put } from "redux-saga/effects";
import { get_user_data, post_user_data } from "../../create-user/api/api";
import {
  GET_USER_FULLFILIED,
  GET_USER_REJECTED,
  POST_USER_FULLFILIED,
  POST_USER_REJECTED,
} from "../../create-user/action/action";

/* ---------------------------- get user manage ---------------------------- */
export function* handle_user_data(action) {
  try {
    const res = yield call(get_user_data, action);
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({
        type: GET_USER_FULLFILIED,
        data,
      });
    } else {
      yield put({
        type: GET_USER_REJECTED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_REJECTED,
      error,
    });
  }
}

/* ---------------------------- post user manage ---------------------------- */
export function* handle_add_user_data(action) {
  try {
    const res = yield call(post_user_data, action);
    const data = res.data;
    console.log(data);
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({
        type: POST_USER_FULLFILIED,
        data,
      });
    } else {
      yield put({
        type: POST_USER_REJECTED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: POST_USER_REJECTED,
      error,
    });
  }
}
