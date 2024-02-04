import { all } from "redux-saga/effects";
import {
  handle_delete_election_saga,
  handle_delete_party_saga,
  handle_delete_user_saga,
  handle_get_election_saga,
  handle_get_party_saga,
  handle_get_user_saga,
  handle_post_election_saga,
  handle_post_party_saga,
  handle_post_user_saga,
  handle_update_election_saga,
} from "./root-saga/rootSaga";
import { handle_update_election_data } from "./electionManage/electionManage";

export function* index_saga() {
  // all RootSaga Function Call in one Line ,
  yield all([
    handle_get_party_saga(),
    handle_post_party_saga(),
    handle_delete_party_saga(),
    handle_get_election_saga(),
    handle_post_election_saga(),
    handle_delete_election_saga(),
    handle_update_election_saga(),
    handle_get_user_saga(),
    handle_post_user_saga(),
    handle_delete_user_saga(),
  ]);
}
