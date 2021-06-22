import * as types from '../types';

const initialState = {
  isLogedin: false,
  usersProducts: [],
  usersAllProducts: [],
  savedSearches: [],
  usersLikedProducts: [],
  loadingUsersLikedProducts: true,
  getAllRecentProducts: [],
  searchedProducts: [],
  rooms: [],
  page: 0,
};

function addressReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADDPRODUCT:
      state.usersAllProducts.push(action.payload.product);
      return {
        ...state,
      };
    case types.USERPRODUCT:
      return {
        ...state,
        usersProducts: action.payload.products,
      };
    case types.USERALLPRODUCT:
      return {
        ...state,
        usersAllProducts: action.payload.products,
      };
    case types.USERLIKEPRODUCT:
      return {
        ...state,
        usersLikedProducts: action.payload.likedproducts,
        loadingUsersLikedProducts: false,
      };
    case types.GETRECENTPRODUCT:
    console.log(action.payload.getAllRecentproducts,'reducer')
      return {
        ...state,
        getAllRecentProducts: action.payload.getAllRecentproducts,
      };
    case types.GETPRODUCTSBYCATEGORIES:
      return {
        ...state,
        productsbycategoryid: action.payload.productsByCategoryId,
      };
    case types.SEARCHEDPRODUCT:
      return {
        ...state,
        searchedProducts: action.payload.searchproducts,
      };
    case types.SAVEDSEARCHED:
      return {
        ...state,
        searchedSaved: action.payload.savedSearches,
      };
    case types.DELETEPRODUCT:
      console.log(action.payload.index);
      state.rooms.splice(action.payload.index, 1);
      return {
        ...state,
        rooms: state.rooms,
      };
    case types.EDITPRODUCT:
      var index = this.usersProducts.findIndex(
        (x) => x._id === this.props.route.params.product._id,
      );
      return {
        ...state,
      };
    case types.SIMILERPRODUCTS:
      return {
        ...state,
        similerProduct: action.payload.similerProduct,
      };
    case types.HOSTELROOMS:
      return {
        ...state,
        rooms: action.payload.rooms,
     
      };
  }

  return state;
}
export default addressReducer;
