import * as types from '../types';

const initialState = {
  isLogedin: false,
  allJobs: [],
};

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case types.BANKACCOUNT:
      return {
        ...state,
      };
    case types.ALLJOBS:
      return {
        ...state,
        allJobs: action.payload.allJobs,
      };
  }

  return state;
}
export default bankReducer;
