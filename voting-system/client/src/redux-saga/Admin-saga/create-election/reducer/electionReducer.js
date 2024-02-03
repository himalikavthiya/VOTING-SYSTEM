import {
  DELETE_ELECTION_FULLFILIED,
  DELETE_ELECTION_PENDING,
  DELETE_ELECTION_REJECTED,
  GET_ELECTION_FULLFILIED,
  GET_ELECTION_PENDING,
  GET_ELECTION_REJECTED,
  POST_ELECTION_FULLFILIED,
  POST_ELECTION_PENDING,
  POST_ELECTION_REJECTED,
  UPDATE_ELECTION_FULLFILIED,
  UPDATE_ELECTION_PENDING,
  UPDATE_ELECTION_REJECTED,
} from "../action/action";

const initialState = {
  electionData: [],
  isLoading: false,
  isError: null,
};

const electionReducer = (state = initialState, action) => {
  // console.log(action, "action-----------------")
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
        electionData: action.data.Data,
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
        // ...state,
        isLoading: false,
          electionData: state.electionData.concat(action.data.Data)
      };
    case POST_ELECTION_REJECTED:
     return {
       ...state,
       isLoading: true,
          isError: action.data,
      };

      //delete
    case DELETE_ELECTION_PENDING: {
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    }
    case DELETE_ELECTION_FULLFILIED: {
      const deleteData = state.electionData.filter((item) => item._id !== action.data);
      return {
        ...state,
        isLoading: false,
        electionData: deleteData,
        isError: null,
      };
    }

    // case DELETE_ELECTION_FULLFILIED: {
    //   console.log("Current Election Data:", state.electionData.Data);
    //   console.log("Action Data to Delete:", action.data.Data);

    //   const deleteData = state.electionData.Data.filter((item) => item._id !== action.data.Data);

    //   console.log("Filtered Data:", deleteData);

    //   return {
    //     ...state,
    //     isLoading: false,
    //     electionData: {
    //       ...state.electionData,
    //       Data: deleteData, // Update the Data property
    //     },
    //     isError: null,
    //   };
    // }
    case DELETE_ELECTION_REJECTED: {
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    }
    case UPDATE_ELECTION_PENDING:
      return {
        ...state,
        isLoding: true,
          isError: null,
      };
    case UPDATE_ELECTION_FULLFILIED:
      return {
        ...state,
        isLoding: false,
        electionData: state.electionData.map((state) =>
            state.id === action.data.id ? action.data : state
          ),
          isError: null,
      };
    case UPDATE_ELECTION_REJECTED:
      return {
        ...state,
        isLoding: false,
          isError: action.data,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default electionReducer;