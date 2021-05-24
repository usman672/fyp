import * as types from '../types';

const initialState = {
  isLogedin: false,
};

function helpQueryReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADDHELPQUERY:
      return {
        ...state,
      };
  }

  return state;
}
export default helpQueryReducer;
