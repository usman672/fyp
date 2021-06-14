import * as types from '../types';

const initialState = {
  isLogedin: false,
  allJobs: [],
  myJobs:[],
};

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case types.MYJOBS:
      return {
        ...state,
        myJobs: action.payload.myJobs,
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
