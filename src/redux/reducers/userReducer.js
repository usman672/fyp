import * as types from '../types';

const initialState = {
  isLogedin: false,
  user: {},
  countries: [],
  hostels: [],
  shops: [],
  userInfo: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGNIN:
      return {
        ...state,
        isLogedin: action.payload.isLogedin,
        user: action.payload.user,
      };
    case types.SIGNUP:
      return {
        ...state,
        isLogedin: action.payload.isLogedin,
      };
    case types.SENDOTP:
      return {
        ...state,
        isLogedin: action.payload.isLogedin,
      };
    case types.CHANGEPASSWORD:
      return {
        ...state,
        isLogedin: action.payload.isLogedin,
      };
    case types.USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case types.GETUSERINFO:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case types.GETHOSTELS:
      return {
        ...state,
        hostels: action.payload.hostels,
      };
    case types.GETSHOPS:
      return {
        ...state,
        shops: action.payload.shops,
      };
  }

  return state;
}
export default userReducer;
