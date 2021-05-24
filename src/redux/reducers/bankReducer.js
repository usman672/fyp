import * as types from '../types';

const initialState = {
  isLogedin: false,
};

function bankReducer(state = initialState, action) {
  switch (action.type) {
    case types.BANKACCOUNT:
      return {
        ...state,
      };
  }

  return state;
}
export default bankReducer;
