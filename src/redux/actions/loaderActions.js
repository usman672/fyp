/*
 * Reducer actions related with login
 */
import * as types from '../types';

export const loaderAction = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.TOGGLE_LOADER,
      payload: {
        isLoading: data.isLoading,
        message: data.message,
      },
    });
    return true;
  };
};
