import * as types from '../types';

const initialState = {
  isLoading: false,
  message: 'Please Wait',
};

function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        message: action.payload.message,
      };
  }
  return state;
}
export default loaderReducer;
