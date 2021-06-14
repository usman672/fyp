import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  addRooms,
  editRoom,
  addProduct,
  editProduct,
  getUserRooms,
  likeDislikeProduct,
  getLikeProduct,
  getAllRecentProducts,
  getProductByCategoryId,
  getProductByKeyword,
  savedSearch,
  deleteRoom,
  getProductsByUser,
} from '../../services/apiList';

export const addRoomsAction = (data,id) => {
  return async (dispatch, getState) => {
     const res = await addRooms(data,id);
    console.log(res,'response')
    if (res.success) {
     
    }
    
    return res;
  };
};

export const editRoomAction = (data,id) => {
  return async (dispatch, getState) => {
     const res = await editRoom(data,id);
    console.log(res,'response')
    if (res.success) {
     
    }
   
    return res;
  };
};

export const addProductAction = (data,id) => {
  return async (dispatch, getState) => {
    console.log(data,'response')
      const res = await addProduct(data,id);
    console.log(res,'Addddddddddddddddddddddddddddddddddddddddd')
    if (res.success) {
     
    }
   
    return res;
  };
};
export const editProductAction = (data, product) => {
   return async (dispatch, getState) => {
    console.log(data,product)
    const res = await editProduct(data,product);
    return res;
  };
};
export const getUserRoomsAction = (data) => {
  return async (dispatch, getState) => {
    console.log('datatataa products .......:', data);
    
    const res = await getUserRooms(data);
    console.log('ew', res);
    if (res.success) {
        dispatch({
          type: types.HOSTELROOMS,
          payload: {
            rooms: res.data,
          },
        });
      }

    return res;
  };
};
export const getProductsAction = (user_id) => {
  console.log(user_id,'fffinfifnifnfin')
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getProductsByUser(user_id);
    if (res.success) {
      console.log(res,'kfrekrekgprekgrekgkprekgporekpok')
      dispatch({
        type: types.USERPRODUCT,
        payload: {
          products: res.data,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const getAllRecentProductsAction = (data) => {
  return async (dispatch, getState) => {
     const res = await getAllRecentProducts(data);
    if (res.success) {
      dispatch({
        type: types.GETRECENTPRODUCT,
        payload: {
          getAllRecentproducts: res.data.recentProducts,
        },
      });
    }
    return res;
  };
};
export const likeDislikeProductAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await likeDislikeProduct(data);
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const getLikeProductAction = () => {
  return async (dispatch, getState) => {
    const res = await getLikeProduct();
    if (res.code === 0) {
      dispatch({
        type: types.USERLIKEPRODUCT,
        payload: {
          likedproducts: res.data.products,
        },
      });
    }

    return res;
  };
};
export const getProductByCategoryIdAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getProductByCategoryId(data);
    if (res.code === 0) {
      if (res.data.products.length > 0) {
        dispatch({
          type: types.GETPRODUCTSBYCATEGORIES,
          payload: {
            productsByCategoryId: res.data.products,
          },
        });
      } else {
        dispatch({
          type: types.GETPRODUCTSBYCATEGORIES,
          payload: {
            productsByCategoryId: [],
          },
        });
      }
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const getProductByKeywordAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getProductByKeyword(data);
    if (res.code === 0) {
      if (res.data.products.length > 0) {
        dispatch({
          type: types.SEARCHEDPRODUCT,
          payload: {
            searchproducts: res.data.products,
          },
        });
      } else {
         dispatch({
          type: types.SEARCHEDPRODUCT,
          payload: {
            searchproducts: [],
          },
        });
      }
    } else {
       dispatch({
        type: types.SEARCHEDPRODUCT,
        payload: {
          searchproducts: [],
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const deleteRoomAction = (id, index) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await deleteRoom(id);
    
    if (res.success) {
      dispatch({
        type: types.DELETEPRODUCT,
        payload: {
          index: index,
        },
      });
    }

    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const savedSearchAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await savedSearch(data);
    if (res.code === 0) {
      dispatch({
        type: types.SAVEDSEARCHED,
        payload: {
          savedSearches: res.data.keywords,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const similarProductAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getProductByCategoryId(data);
    if (res.code === 0) {
      dispatch({
        type: types.SIMILERPRODUCTS,
        payload: {
          similerProduct: res.data.products,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
