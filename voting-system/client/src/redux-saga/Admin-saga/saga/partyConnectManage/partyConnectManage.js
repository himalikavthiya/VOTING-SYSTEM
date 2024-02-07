import {
  call,
  put
} from "redux-saga/effects";
import {
  GET_PARTYCONNECT_FULLFILIED,
  GET_PARTYCONNECT_REJECTED,
  POST_PARTYCONNECT_FULLFILIED,
  POST_PARTYCONNECT_REJECTED,
} from "../../party-connect/action/action";
import {
  get_partyConnect_data,
  post_partyConnect_data,
} from "../../party-connect/api/api";

/* --------------------------- GET PARTYCONNECTION MANAGE -------------------------- */
export function* handle_partyconnect_data(action) {
  console.log(action, "action from manage")
  try {
    const res = yield call(get_partyConnect_data, action);
    console.log(res, "ressss")
    const data = res.data;
    const status = res.status;
    if (status === 200) {
      yield put({
        type: GET_PARTYCONNECT_FULLFILIED,
        data,
      });
    } else {
      yield put({
        type: GET_PARTYCONNECT_REJECTED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_PARTYCONNECT_REJECTED,
      error,
    });
  }
}

/* ---------------------------- POST PARTYCONNECTION  MANGE --------------------------- */
export function* handle_add_partyconnect_data(action) {
  // console.log(action.data);
  try {
    const res = yield call(post_partyConnect_data, action);
    console.log(res, "resssss");
    const data = res.data;
    console.log(data, "dataatata");
    const status = res.status;
    if (status === 200 || status === 201) {
      yield put({
        type: POST_PARTYCONNECT_FULLFILIED,
        data,
      });
    } else {
      yield put({
        type: POST_PARTYCONNECT_REJECTED,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: POST_PARTYCONNECT_REJECTED,
      error,
    });
  }
}