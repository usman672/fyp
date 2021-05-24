import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import { imageUpload } from '../../services/apiList';
export const imageUploadAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await imageUpload(data);
    if (res.code === 0) {
      dispatch({
        type: types.IMAGEUPLOAD,
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
