import {
    all
} from "redux-saga/effects";
import {
    handle_get_election_Saga,
    handle_get_party_Saga,
    handle_post_election_Saga,
    handle_post_party_Saga,
} from "./root-saga/rootSaga";

export function* index_saga() {
    // all RootSaga Function Call in one Line ,
    yield all([handle_get_party_Saga(), handle_post_party_Saga(),handle_get_election_Saga(),handle_post_election_Saga()])
}