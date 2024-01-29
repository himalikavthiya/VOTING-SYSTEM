import { all } from "redux-saga/effects";
import {
  handle_delete_paty_saga,
  handle_get_election_Saga,
  handle_get_party_Saga,
  handle_get_user_saga,
  handle_post_election_Saga,
  handle_post_party_Saga,
  handle_post_user_saga,
} from "./root-saga/rootSaga";

export function* index_saga() {
  // all RootSaga Function Call in one Line ,
  yield all([
    handle_get_party_Saga(),
    handle_post_party_Saga(),
    handle_delete_paty_saga(),
    handle_get_election_Saga(),
    handle_post_election_Saga(),
    handle_get_user_saga(),
    handle_post_user_saga(),
  ]);
}
