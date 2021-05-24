import * as types from '../types';

const initialState = {
  isLogedin: false,
  categories: [],
  firstLineHotCategory: [],
  secondLineHotCategory: [],
}

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case types.GETALLCATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };
    case types.GETHOTCATEGORIES:
      return {
        ...state,
        firstLineHotCategory: action.payload.leftcategories,
        secondLineHotCategory: action.payload.rightcategories,
      };
  }

  return state;
}
export default categoriesReducer;
