import * as types from '../types';

const initialState = {
  isLogedin: false,
  recentProduct: {},
  countries: [],
  countriesDropdown: []
};

function addressReducer(state = initialState, action) {
  switch (action.type) {
    case types.COUNTRIES:
      return {
        ...state,
        countries: action.payload.countries,
        countriesDropdown: action.payload.countriesDropdown,
      };
    case types.SAVEADDRESS:
      return {
        ...state,
      };
    case types.EDITADDRESS:
      return {
        ...state,
      };
  }

  return state;
}
export default addressReducer;
