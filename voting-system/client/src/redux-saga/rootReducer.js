import {
    combineReducers
} from "redux";
import electionReducer from "./Admin-saga/create-election/reducer/electionReducer";
import electionPartyReducer from "./Admin-saga/election-party/reducer/electionPartyReducer";

const rootReducer = combineReducers({
    electionPartyReducer,
    electionPartyReducer,
})

export default rootReducer;