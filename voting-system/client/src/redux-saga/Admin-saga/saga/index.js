import {
    all
} from "redux-saga/effects";
import {
    handle_get_party_Saga,
} from "./root-saga/rootSaga";

export function* index_saga() {
    // all RootSaga Function Call in one Line ,
    yield all([handle_get_party_Saga()])
}