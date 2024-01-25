import {
    combineReducers
} from "redux";
import electionReducer from "./Admin-saga/election-party/reducer/electionReducer"

const rootReducer = combineReducers({
    electionReducer,
})

export default rootReducer;