import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import { addHelpQuery } from '../../services/apiList';
export const addHelpQueryAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await addHelpQuery(data);
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
