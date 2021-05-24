import * as types from '../types';

const initialState = {
  isLogedin: false,
};

function imageUploadReducer(state = initialState, action) {
  switch (action.type) {
    case types.IMAGEUPLOAD:
      return {
        ...state,
      };
  }

  return state;
}
export default imageUploadReducer;
