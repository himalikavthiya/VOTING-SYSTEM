import {
  GET_ELECTION_FULLFILIED,
  GET_ELECTION_PENDING,
  GET_ELECTION_REJECTED,
  POST_ELECTION_FULLFILIED,
  POST_ELECTION_PENDING,
  POST_ELECTION_REJECTED,
} from "../action/action";

const initialState = {
  electionData: [],
  isLoading: false,
  isError: null,
};

const electionReducer = (state = initialState, action) => {
  // console.log(action,"action")
  switch (action.type) {
    case GET_ELECTION_PENDING: {
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    }
    case GET_ELECTION_FULLFILIED: {
      return {
        ...state,
        isLoading: false,
        electionData: action.data,
        isError: null,
      };
    }
    case GET_ELECTION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isError: action.data,
      };
    }
//post
    case POST_ELECTION_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case POST_ELECTION_FULLFILIED:
      return {
        ...state,
        isError: action.data,
      };
    case POST_ELECTION_REJECTED:
      return {
        ...state,
        isLoading: true,
        electionData: state.electionData.concat(action.data),
        isLoading: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default electionReducer;
