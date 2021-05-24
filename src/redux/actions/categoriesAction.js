import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import { getCategories, getHotCategories } from '../../services/apiList';

export const getAllCategoriesAction = () => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getCategories();
    if (res.code === 0) {
      dispatch({
        type: types.GETALLCATEGORIES,
        payload: {
          categories: res.data.categories,
        },
      });
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
export const getHotCategoriesAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getHotCategories(data);
    let letters = res.data.categories;
    let leftSide = letters.splice(0, Math.ceil(letters.length /2));
    let rightSide = letters;
    if (res.code === 0) {
      dispatch({
        type: types.GETHOTCATEGORIES,
        payload: {
          leftcategories: leftSide,
          rightcategories: rightSide,
        },
      });
    }
    // await dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
    return res;
  };
};
