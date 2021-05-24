import * as types from '../types/index';
import Actions from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  notificationSetting,
  getNotificationSettings,
  getNotifications,
} from '../../services/apiList';

export const notificatrionSettingAction = (data) => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    // console.log(data,'12');
    const res = await notificationSetting(data);
    // console.log(res,'12');
    if (res.code === 0) {
      dispatch({
        type: types.NOTIFICATIONSETTINGINFO,
        payload: {
          notificationinfo: res.data.updateRes,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};
export const getNotificationSettingsAction = () => {
  return async (dispatch, getState) => {
    dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getNotificationSettings();
    // console.log(res, 9999999);
    if (res.code === 0) {
      dispatch({
        type: types.NOTIFICATIONSETTINGINFO,
        payload: {
          notificationinfo: res.data.settings,
        },
      });
    }
    await dispatch(
      await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    );
    return res;
  };
};

export const getNotificationsAction = (data) => {
  return async (dispatch, getState) => {
    //dispatch(Actions.loaderAction({ isLoading: true, message: 'Please Wait' }));
    const res = await getNotifications(data);
    // console.log(res,"notification");
    if (res.code === 0) {
      // console.log(res.data.notifications, 'Notifications List');
      dispatch({
        type: types.NOTIFICATIONSLIST,
        payload: {
          notificationsList: res.data.notifications,
          page:data.page
        },
      });
    }
    return res;
    // dispatch(
    //   await Actions.loaderAction({ isLoading: false, message: 'Please Wait' }),
    // );
  };
};
