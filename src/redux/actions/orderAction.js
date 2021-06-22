import * as types from '../types/index';
import Actions from '../actions';
import {
  bookRoom,
  inProgrssOrder,
  completeBuyOrder,
  inProgressSellOrder,
  completeSellOrder,
  orderStatus,
  dopayment,
  orderReview,
  orderRating,
  getReviews,
  buyProduct,
} from '../../services/apiList';
import storage from '../../libs/storage';

export const bookRoomAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await bookRoom(data);
    console.log(res, 'oopo');
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const buyProductAction = (id, data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await buyProduct(data, id);
    console.log(res, 'oopo');
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const inProgrssBuyAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);

    const res = await inProgrssOrder(data, user._id);
    console.log(data);

    if (res.code === 0) {
      dispatch({
        type: types.GETBUYERINPROGRESS,
        payload: {
          inprogressorder: res.data.orders,
          page: data.page,
        },
      });
    } else {
      dispatch({
        type: types.GETBUYERINPROGRESS,
        payload: {
          inprogressorder: [],
        },
      });
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const completeBuyAction = (data) => {
  return async (dispatch, getState) => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    const res = await completeBuyOrder(data, user._id);
    if (res.code === 0) {
      dispatch({
        type: types.GETBUYERCOMPLETED,
        payload: {
          completedorder: res.data.orders,
          page: data.page,
        },
      });
    } else {
      dispatch({
        type: types.GETBUYERCOMPLETED,
        payload: {
          completedorder: [],
        },
      });
    }

    return res;
  };
};
export const inProgrssSellAction = (data) => {
  console.log('hell02', data);
  return async (dispatch, getState) => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    const res = await inProgressSellOrder(data, user._id);

    if (res.code === 0) {
      dispatch({
        type: types.GETSELLERINPROGRESS,
        payload: {
          inprogressorder: res.data.orders,
          page: data.page,
        },
      });
    } else {
      dispatch({
        type: types.GETSELLERINPROGRESS,
        payload: {
          inprogressorder: [],
        },
      });
    }

    return res;
  };
};
export const completeSellAction = (data) => {
  return async (dispatch, getState) => {
    let user = await storage._retrieveData('user');
    user = JSON.parse(user);
    const res = await completeSellOrder(data, user._id);
    console.log(res, 'completeSellAction');
    if (res.code === 0) {
      dispatch({
        type: types.GETSELLERCOMPLETED,
        payload: {
          completedorder: res.data.orders,
          page: data.page,
        },
      });
    } else {
      dispatch({
        type: types.GETSELLERCOMPLETED,
        payload: {
          completedorder: [],
        },
      });
    }
    return res;
  };
};
export const doPaymentAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    // let user = await storage._retrieveData('user');
    // user = JSON.parse(user);
    const res = await dopayment(data);
    if (res.code === 0) {
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const checkOrderStatus = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    // console.log(data,23232);
    const res = await orderStatus(data);
    if (res.code === 0) {
      dispatch({
        type: types.GETORDERSTATUS,
        payload: {
          getorderStatus: res.data.order.last_tracking_status,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const reviewOrder = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    // console.log(data,23232);
    const res = await orderReview(data);
    if (res.code === 0) {
      // console.log(res);
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const ratingOrder = (data, id, type) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await orderRating(data, id, type);
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const getReviewsAction = (id, type) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getReviews(id, type);
    console.log(res, 'ssksksksk');
    if (res.success) {
      dispatch({
        type: types.GETREVIEWS,
        payload: {
          allReviews: res.data,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
