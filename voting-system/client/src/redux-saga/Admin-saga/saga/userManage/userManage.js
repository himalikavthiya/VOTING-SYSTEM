import { call, put } from "redux-saga/effects";
import { delete_user_data, get_user_data, post_user_data } from "../../create-user/api/api";
import {
  DELETE_USER_FULLFILIED,
  DELETE_USER_REJECTED,
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
/* ------------------------- delete user manage ------------------------- */

export function* handle_delete_user_data(action) {
  // console.log(action,"action manage")
  try {
      const res = yield call(delete_user_data, action);
      // console.log(res ,"res from manage saga")
      const status = res.status;
      const data = res.data;

      if (status === 200 || status === 201) {
          yield put({
              type: DELETE_USER_FULLFILIED,
              data
          });
      } else {
          yield put({
              type: DELETE_USER_REJECTED,
              data
          });
      }
  } catch (err) {
      yield put({
          type: DELETE_USER_REJECTED
      })
  }
}