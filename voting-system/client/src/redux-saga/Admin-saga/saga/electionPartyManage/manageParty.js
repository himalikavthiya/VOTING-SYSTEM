import {
    call,
    put
} from "redux-saga/effects"
import {
    DELETE_ELECTION_PARTY_FULLFILIED,
    DELETE_ELECTION_PARTY_REJECTED,
    GET_ELECTION_PARTY_FULLFILIED,
    GET_ELECTION_PARTY_REJECTED,
    POST_ELECTION_PARTY_FULLFILIED,
    POST_ELECTION_PARTY_REJECTED
} from "../../election-party/action/action"
import {
    delete_party_data,
    get_party_data,
    post_party_data
} from "../../election-party/api/api"

/* ---------------------------- get party manage ---------------------------- */
export function* handle_get_party_data(action) {
    try {
        const res = yield call(get_party_data, action)
        const data = res.data;
        const status = res.status;
        if (status === 200) {
            yield put({
                type: GET_ELECTION_PARTY_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: GET_ELECTION_PARTY_REJECTED,
                data
            })
        }
    } catch (error) {
        yield put({
            type: GET_ELECTION_PARTY_REJECTED,
            error
        })
    }
}

/* ---------------------------- post party manage --------------------------- */
export function* handle_add_party_data(action) {

    try {
        const res = yield call(post_party_data, action);
        const data = res.data;
        console.log(data, "sagagagagaga");
        const status = res.status;
        if (status === 200 || status === 201) {
            yield put({
                type: POST_ELECTION_PARTY_FULLFILIED,
                data
            })
        } else {
            yield put({
                type: POST_ELECTION_PARTY_REJECTED,
                data
            })

        }
    } catch (error) {
        yield put({
            type: POST_ELECTION_PARTY_REJECTED,
            error
        })
    }

}

/* --------------------------- delete election party data -------------------------- */
export function* handle_delete_party_data(action) {
    try {
        const res = yield call(delete_party_data, action);
        const status = res.status;
        const data = res.data;
        if (status === 200 || status === 201) {
            yield put({
                type: DELETE_ELECTION_PARTY_FULLFILIED,
                data
            });
        } else {
            yield put({
                type: DELETE_ELECTION_PARTY_REJECTED,
                data
            });
        }
    } catch (err) {
        yield put({
            type: DELETE_ELECTION_PARTY_REJECTED
        })
    }
}