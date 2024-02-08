import {
  GET_PARTYCONNECT_FULLFILIED,
  GET_PARTYCONNECT_PENDING,
  GET_PARTYCONNECT_REJECTED,
  POST_PARTYCONNECT_FULLFILIED,
  POST_PARTYCONNECT_PENDING,
  POST_PARTYCONNECT_REJECTED,
} from "../action/action";

const initialState = {
  partyConnectData: [],
  isLoading: false,
  isError: null,
};

const PartyConnectReducer = (state = initialState, action) => {
  // console.log(action, "action-----------------")
  switch (action.type) {
    case GET_PARTYCONNECT_PENDING: {
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    }
    case GET_PARTYCONNECT_FULLFILIED: {

      return {
        ...state,
        isLoading: false,
        partyConnectData: action.data.Data,
        isError: null,
      };
    }
    case GET_PARTYCONNECT_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isError: action.data,
      };
    }

    //post
    case POST_PARTYCONNECT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case POST_PARTYCONNECT_FULLFILIED:
      return {
        // ...state,
        isLoading: false,
          partyConnectData: state.partyConnectData.concat(action.data.Data),
      };
    case POST_PARTYCONNECT_REJECTED:
      return {
        ...state,
        isLoading: true,
          isError: action.data,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default PartyConnectReducer;