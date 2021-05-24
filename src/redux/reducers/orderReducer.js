import * as types from '../types';

const initialState = {
  inprogressbuyOrder: [],
  usersAllProducts: [],
  inprogressellOrder: [],
  completedsellOrder: [],
  completedbuyOrder: [],
  getorderStatus: [],
  inProgressPage: 0,
  inProgressBuyerPage: 0,
  buyerCompletedPage: 0,
  sellerCompletedPage: 0,
  allReviews: [],
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case types.GETBUYERINPROGRESS:
      state.inprogressbuyOrder = state.inprogressbuyOrder.concat(
        action.payload.inprogressorder,
      );
      console.log('buyer orders', action.payload.inprogressorder.length);
      state.inProgressBuyerPage = action.payload.page;

      return {
        ...state,
        inprogressbuyOrder: state.inprogressbuyOrder,
        inProgressBuyerPage: state.inProgressBuyerPage,
      };
    case types.GETBUYERCOMPLETED:
      state.completedbuyOrder = state.completedbuyOrder.concat(
        action.payload.completedorder,
      );
      //console.log('compl orders',action.payload.completedorder)
      state.buyerCompletedPage = action.payload.page;

      return {
        ...state,
        completedbuyOrder: state.completedbuyOrder,
        buyerCompletedPage: state.buyerCompletedPage,
      };
    case types.GETSELLERINPROGRESS:
      state.inprogressellOrder = state.inprogressellOrder.concat(
        action.payload.inprogressorder,
      );

      state.inProgressPage = action.payload.page;
      return {
        ...state,
        inprogressellOrder: state.inprogressellOrder,
        inProgressPage: state.inProgressPage,
      };
    case types.GETSELLERCOMPLETED:
      state.completedsellOrder = state.completedsellOrder.concat(
        action.payload.completedorder,
      );

      state.sellerCompletedPage = action.payload.page;
      return {
        ...state,
        completedsellOrder: state.completedsellOrder,
        sellerCompletedPage: state.sellerCompletedPage,
      };
    case types.GETORDERSTATUS:
      return {
        ...state,
        getorderStatus: action.payload.getorderStatus,
      };
    case types.GETREVIEWS:
      return {
        ...state,
        allReviews: action.payload.allReviews,
      };
  }

  return state;
}
export default orderReducer;
