import {
    call,
    put
} from "redux-saga/effects"
import {
    delete_election_data,
    get_election_data,
    post_election_data,
    update_election_data
} from "../../create-election/api/api";
import {
    DELETE_ELECTION_FULLFILIED,
    DELETE_ELECTION_REJECTED,
    GET_ELECTION_FULLFILIED,
    GET_ELECTION_REJECTED,
    POST_ELECTION_FULLFILIED,
    POST_ELECTION_REJECTED,
    UPDATE_ELECTION_FULLFILIED,
    UPDATE_ELECTION_REJECTED
} from "../../create-election/action/action";

/* --------------------------- GET ELECTION MANAGE -------------------------- */
export function* handle_election_data(action) {
    try {
        const res = yield call(get_election_data, action)
        const data = res.data;
        const status = res.status;
        if (status === 200) {
            yield put({
                type: GET_ELECTION_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: GET_ELECTION_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: GET_ELECTION_REJECTED,
            error
        })
    }
}

/* ---------------------------- POST ELECTION MANGE --------------------------- */
export function* handle_add_election_data(action) {
    // console.log(action.data);
    try {
        const res = yield call(post_election_data, action);
        console.log(res, "resssss");
        const data = res.data;
        console.log(data, "dataatata");
        const status = res.status;
        if (status === 200 || status === 201) {
            yield put({
                type: POST_ELECTION_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: POST_ELECTION_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: POST_ELECTION_REJECTED,
            error
        })
    }

}
/* ------------------------- delete election manage ------------------------- */
export function* handle_delete_election_data(action) {
    // console.log(action,"action manage")
    try {
        const res = yield call(delete_election_data, action);
        // console.log(res ,"res from manage saga")
        const status = res.status;
        const data = res.data;

        if (status === 200 || status === 201) {
            yield put({
                type: DELETE_ELECTION_FULLFILIED,
                data
            });
        } else {
            yield put({
                type: DELETE_ELECTION_REJECTED,
                data
            });
        }
    } catch (err) {
        yield put({
            type: DELETE_ELECTION_REJECTED
        })
    }
}

/* ------------------------- UPDATE election manage ------------------------- */
export function* handle_update_election_data(action) {
    try {
      const res = yield call(update_election_data, action);
      const data = res.data;
      const status = res.status;
      if (status === 200) {
        yield put({ type: UPDATE_ELECTION_FULLFILIED, data });
      } else {
        yield put({ type: UPDATE_ELECTION_REJECTED, data });
      }
    } catch (error) {
      yield put({ type: UPDATE_ELECTION_REJECTED, error });
    }
  }