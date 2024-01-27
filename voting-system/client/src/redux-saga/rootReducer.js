import {
    combineReducers
} from "redux";
import electionReducer from "./Admin-saga/create-election/reducer/electionReducer";
import electionPartyReducer from "./Admin-saga/election-party/reducer/electionPartyReducer";

const rootReducer = combineReducers({
    electionReducer,
    electionPartyReducer,
})

export default rootReducer;